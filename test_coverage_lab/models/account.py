"""
models/account.py

Defines the Account model.
"""

from datetime import datetime
import re
from werkzeug.security import generate_password_hash, check_password_hash
from models import db

class DataValidationError(Exception):
    """Used for data validation errors"""
    pass

class Account(db.Model):
    """ Represents an Account in the system """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    phone_number = db.Column(db.String(20))
    disabled = db.Column(db.Boolean, default=False)
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)
    balance = db.Column(db.Float, default=0.0)
    role = db.Column(db.String(20), default="user")  # Possible roles: user, admin
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return f"<Account '{self.name}'>"

    def to_dict(self) -> dict:
        """Serializes the account object to a dictionary"""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "disabled": self.disabled,
            "date_joined": self.date_joined,
            "balance": self.balance,
            "role": self.role
        }

    def validate_email(self):
        """Validates email format"""
        email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        if not re.match(email_regex, self.email):
            raise DataValidationError("Invalid email format")

    def validate_unique_email(self):
        """Ensures the email is unique in the database"""
        existing_account = Account.query.filter_by(email=self.email).first()
        if existing_account and existing_account.id != self.id:
            raise DataValidationError("Email must be unique")

    def deposit(self, amount):
        """Deposits an amount into the account balance"""
        if amount <= 0:
            raise DataValidationError("Deposit amount must be positive")
        self.balance += amount

    def withdraw(self, amount):
        """Withdraws an amount from the account balance"""
        if amount <= 0:
            raise DataValidationError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise DataValidationError("Insufficient balance")
        self.balance -= amount

    def set_password(self, password):
        """Hashes and stores the password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if the given password matches the stored password"""
        return check_password_hash(self.password_hash, password)

    def change_role(self, new_role):
        """Changes the user role"""
        if new_role not in ["user", "admin"]:
            raise DataValidationError("Invalid role")
        self.role = new_role
    
    def deactivate(self):
        """Deactivates the account"""
        self.disabled = True

    def reactivate(self):
        """Reactivates the account"""
        self.disabled = False

    def delete(self):
        """Deletes the account from the database"""
        db.session.delete(self)
        db.session.commit()

