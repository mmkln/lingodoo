# Hungarian to English Translator

This script reads Hungarian words from a JSON file, translates them into English (or another language), and saves the results to a new JSON file.

## Requirements

- Python 3.x
- `googletrans==4.0.0-rc1`

## Setup

1. **Create a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**

   ```bash
   pip install googletrans==4.0.0-rc1
   ```

## Usage

1. Place your input JSON file (`input_hungarian_words.json`) in the project directory.

2. Run the script:

   ```bash
   python translate.py
   ```

3. The translated words will be saved in `output_translated_words.json`.

## License

MIT License
```

Ця версія README містить лише найважливішу інформацію для налаштування та запуску проєкту.
