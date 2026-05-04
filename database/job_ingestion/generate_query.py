import json
import re

INPUT_FILE = "jobs.ndjson"
OUTPUT_FILE = "job_inserts.sql"


def escape_sql(value: str) -> str:
    """Escape single quotes for SQL."""
    return value.replace("'", "''")


def normalize_job_type(employment_type, title, description):
    """Infer a normalized job type."""
    text = " ".join([
        employment_type or "",
        title or "",
        description or ""
    ]).lower()

    if any(k in text for k in ["intern", "internship"]):
        return "internship"

    if any(k in text for k in ["contract", "contractor", "freelance"]):
        return "contract"

    if any(k in text for k in ["part-time", "part time"]):
        return "part-time"

    if any(k in text for k in ["temporary", "temp"]):
        return "temporary"

    if any(k in text for k in ["full-time", "full time"]):
        return "full-time"

    # default assumption
    return "full-time"


def extract_skills(description):
    """
    Basic keyword extraction.
    (You can replace this later with a better system.)
    """
    if not description:
        return []

    words = re.findall(r"\b[A-Za-z]{4,}\b", description.lower())

    # remove very common filler words
    stopwords = {
        "this", "that", "with", "have", "from", "your",
        "will", "their", "about", "which", "when",
        "where", "been", "they", "them", "were"
    }

    filtered = [w for w in words if w not in stopwords]

    # dedupe while preserving order
    seen = set()
    result = []
    for w in filtered:
        if w not in seen:
            seen.add(w)
            result.append(w)

    return result[:20]  # cap size


def format_value(val):
    """Convert Python value into SQL-safe string."""
    if val is None or val == "":
        return "NULL"
    return f"'{escape_sql(str(val))}'"


def main():
    rows = []
    job_id = 1

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            data = json.loads(line)

            job_location = data.get("location")
            company = data.get("company")
            title = data.get("title")
            description = data.get("description")
            link = data.get("applyUrl")

            job_type = normalize_job_type(
                data.get("employmentType"),
                title,
                description
            )

            skills = extract_skills(description)
            skills_json = json.dumps(skills) if skills else None

            row = f"""(
{job_id},
{format_value(job_location)},
{format_value(company)},
NULL,
{format_value(title)},
{format_value(job_type)},
NULL,
{format_value(description)},
{format_value(link)},
{format_value(skills_json)}
)"""

            rows.append(row)
            job_id += 1

    sql = f"""INSERT INTO job_info (
job_id,
job_location,
company,
pay,
job_title,
job_type,
duration,
job_description,
link,
extracted_skills
)
VALUES
{",\n".join(rows)};
"""

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(sql)

    print(f"Done. Wrote {len(rows)} rows to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()