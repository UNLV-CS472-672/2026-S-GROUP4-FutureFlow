# Software Testing Lab
This repo contains starter code for test coverage exercises. Follow the instructions on the [class website](https://johnxu21.github.io/teaching/CS472/Timetable/dynamic_analysis/?) to get started.

## Additional Information

### Python Version (s)
To be able to following the lab, you need at least python `>= 3.8`. The exercise has been testing with the following Python versions: `3.8.1`, `3.9.5`, `3.9.6`, `3.9.7` and `3.10.10` but any version of python `3.8+` work without any configuration issues. **If you are facing any configuration issue, please reach out to the T.A**. 

### Upgrading PIP:
Sometimes it is useful to upgrade `pip` before installing dependencies. If you like, run: `pip install --upgrade pip` and later install the dependencies using: `pip install -r requirements.txt`

### Python Virtual Environment - Optional
 - It is a good practice to configure python virtual environment. Use the commands below to setup python virtual environment on `Linux/MacOS` or `Windows OS`
   ```
   # For Linux/MacOS

   python3 -m venv venv
   source venv/bin/activate
   ```
   **NB:** Replace `python3` with any of the versions listed above e.g: `python3.7` or `python3.9.5`. 

   - For `Window OS` user, the easest approach is to install `virtualenv` by running `pip install virtualenv`. The next step is pretty much similar to above;
   ```
   # For Window OS

   python3 -m virtualenv venv
   venv\Scripts\activate
   ```
   - Install required dependencies using `pip3 install -r requirements.txt`
