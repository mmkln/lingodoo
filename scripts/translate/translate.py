import json
import os
from googletrans import Translator, LANGUAGES
from tqdm import tqdm

# Ініціалізуємо перекладач
translator = Translator()

# Визначаємо шляхи до вхідного та вихідного файлів
input_file = 'data/WORDS_HP_HU.json'
output_file = 'generated/output_translated_words2.json'

# Функція для перекладу слів
def translate_word(word, target_language='en'):
    try:
        translation = translator.translate(word, dest=target_language)
        return translation.text
    except Exception as e:
        print(f"Помилка при перекладі слова '{word}': {e}")
        return word  # Повертаємо оригінальне слово у випадку помилки

# Читання вихідного JSON файлу
with open(input_file, 'r', encoding='utf-8') as infile:
    hungarian_words = json.load(infile)

# Перевірка, чи існує вихідний файл, і створення його, якщо він відсутній
if not os.path.exists(output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump([], outfile, ensure_ascii=False, indent=4)

# Завантажуємо існуючі переклади, якщо такі є
with open(output_file, 'r', encoding='utf-8') as outfile:
    translated_words = json.load(outfile)

# Використання індикатора прогресу для відстеження виконання
for item in tqdm(hungarian_words, desc="Переклад слів", unit="слово"):
    translated_word = translate_word(item['word'], 'en')  # Перекладаємо на англійську
    
    # Перевірка наявності прикладу
    if 'example' not in item:
        print(f"Увага: Для слова '{item['word']}' відсутній приклад використання.")
    
    new_item = {
        'word': item['word'],
        'translation': item['translation'],
        'en': {
            'translation': translated_word,
        },
        'example': item.get('example', '')  # Використовуємо порожній рядок, якщо приклад відсутній
    }
    translated_words.append(new_item)

# Збереження оновленого списку у JSON файл
with open(output_file, 'w', encoding='utf-8') as outfile:
    json.dump(translated_words, outfile, ensure_ascii=False, indent=4)

print(f"Переклад завершено та збережено у файл '{output_file}'")