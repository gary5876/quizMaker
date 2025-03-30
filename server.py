from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pytesseract
from PIL import Image
import re
import kss

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}
ALLOWED_TEXT_EXTENSIONS = {'txt'}

# OCR 설정 (Windows에서 경로 지정)
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\jerry\Desktop\전남대\projects\문제생성기\tesseract\Tesseract-OCR\tesseract.exe"

def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/upload', methods=['POST'])
def upload():
    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return jsonify({'message': '파일이 없습니다.'}), 400

    filename = uploaded_file.filename
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    uploaded_file.save(filepath)

    ext = filename.rsplit('.', 1)[1].lower()

    if allowed_file(filename, ALLOWED_IMAGE_EXTENSIONS):
        text = pytesseract.image_to_string(Image.open(filepath), lang='kor+eng')
        return jsonify({'message': 'OCR 완료', 'text': text})

    elif allowed_file(filename, ALLOWED_TEXT_EXTENSIONS):
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()
        return jsonify({'message': '텍스트 추출 완료', 'text': text})

    else:
        return jsonify({'message': '지원하지 않는 파일 형식입니다.'}), 400

# 🔽 여기가 문제 생성 API
def extract_keywords_simple(sentence):
    words = re.findall(r'[가-힣]{2,}', sentence)
    if not words:
        return None
    return max(words, key=len)

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    text = data.get('text', '')

    sentences = kss.split_sentences(text)
    problems = []

    for idx, sent in enumerate(sentences):
        keyword = extract_keywords_simple(sent)
        if keyword and keyword in sent:
            blanked = sent.replace(keyword, '____', 1)
            problems.append({
                'id': idx,
                'question': blanked,
                'answer': keyword
            })

    return jsonify({'message': '문제 생성 완료', 'problems': problems})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
