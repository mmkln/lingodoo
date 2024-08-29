import json
import os
from googletrans import Translator
from concurrent.futures import ThreadPoolExecutor, as_completed

# Ініціалізуємо перекладач
translator = Translator()

# Визначаємо шляхи до вхідного та вихідного файлів
input_file = 'data/WORDS_HP_HU.json'
output_file = 'generated/output_translated_words_async.json'

# Функція для перекладу слова
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

# Використання ThreadPoolExecutor для паралельного виконання перекладів
with ThreadPoolExecutor(max_workers=10) as executor:
    futures = {executor.submit(translate_word, item['word'], 'en'): item for item in hungarian_words}
    for future in as_completed(futures):
        item = futures[future]
        translated_word = future.result()

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