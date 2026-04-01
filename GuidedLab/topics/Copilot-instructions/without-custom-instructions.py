import csv

# Write a Python function to read a CSV file

def read_csv(file_path):
    """Read a CSV file and return its contents as a list of dictionaries."""
    data = []
    with open(file_path, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data
