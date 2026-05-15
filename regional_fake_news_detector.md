# Regional Fake News Detector

## Project Overview

A multilingual AI-powered fake news detection platform designed specifically for Indian regional languages like Marathi, Hindi, Gujarati, Telugu, etc.

The system helps users verify suspicious news, WhatsApp forwards, screenshots, and social media posts by analyzing content credibility and comparing it against trusted fact-checking sources.

---

# Problem Statement

Most fake news detection systems primarily focus on English content.

However, in India, misinformation spreads rapidly through:

- WhatsApp forwards
- Regional-language Facebook posts
- Edited screenshots
- Viral voice notes
- Local-language news channels

There is a significant lack of tools capable of detecting fake or misleading content in regional Indian languages.

---

# Proposed Solution

The application allows users to:

- Paste suspicious text
- Upload screenshots
- Submit news article links
- Upload voice notes
- Verify claims in multiple regional languages

The system then analyzes the content and provides:

- Fake / Real / Misleading verdict
- Confidence score
- AI-generated explanation
- Trusted source references

---

# Features

## 1. Text-Based Fake News Detection

Users can paste text in:
- Marathi
- Hindi
- English
- Other regional languages

The system analyzes:
- Emotional manipulation
- Suspicious wording
- Credibility patterns
- Language sentiment
- Claim structure

---

## 2. Screenshot/Image Verification

Users can upload screenshots of:
- WhatsApp forwards
- Social media posts
- News headlines

### Process:
1. OCR extracts text
2. AI analyzes extracted claim
3. System provides verification result

---

## 3. Fact-Check Source Matching

The application compares claims against trusted fact-checking platforms such as:

- PIB Fact Check
- Alt News
- BOOM Live
- Factly
- Trusted news agencies

---

## 4. Regional Language Support

Initial language support:
- Marathi
- Hindi
- English

Future expansion:
- Gujarati
- Telugu
- Kannada
- Bengali
- Tamil

---

## 5. AI Explanation System

Instead of simply labeling content as fake, the system explains WHY.

### Example:

> This claim appears suspicious because no official government source confirms it, and similar claims were previously marked false by trusted fact-checking websites.

---

# User Flow

1. User selects language
2. User pastes text or uploads image
3. OCR extracts text if image uploaded
4. Language detection is performed
5. AI model analyzes credibility
6. System displays:
   - Verdict
   - Confidence score
   - Explanation
   - Related fact-check links

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS

## Backend
- Java Spring Boot

## Database
- MongoDB / PostgreSQL

## AI / Machine Learning
- Python
- Scikit-learn
- TensorFlow / PyTorch
- IndicBERT / MuRIL / mBERT

## OCR
- Tesseract OCR
- Google Vision API

## APIs
- News API
- Google Search API
- Fact-check source APIs

---

# System Architecture

## Frontend
Handles:
- User input
- Upload interface
- Results dashboard

## Backend
Handles:
- API communication
- Authentication
- Request processing
- Database operations

## AI Engine
Handles:
- Language detection
- Fake news classification
- Confidence scoring
- AI explanations

## OCR Engine
Handles:
- Extracting text from images/screenshots

---

# Database Design

## Users Table

| Field | Type |
|---|---|
| user_id | UUID |
| name | String |
| email | String |
| role | String |

---

## Claims Table

| Field | Type |
|---|---|
| claim_id | UUID |
| original_text | Text |
| translated_text | Text |
| language | String |
| verdict | String |
| confidence | Float |
| explanation | Text |
| created_at | Timestamp |

---

## Sources Table

| Field | Type |
|---|---|
| source_id | UUID |
| website_name | String |
| credibility_score | Float |
| url | String |

---

# Machine Learning Approach

## Phase 1 — Rule-Based Detection

Detect:
- Panic/emotional words
- ALL CAPS headlines
- “Forward to everyone”
- No source references
- Suspicious URLs

---

## Phase 2 — ML Classification

Train models on:
- Fake news datasets
- Regional-language datasets

Classification categories:
- Fake
- Real
- Misleading

---

## Phase 3 — Hybrid AI System

Combine:
- ML predictions
- Source credibility
- Fact-check search
- LLM-generated explanations

---

# Advanced Features

## WhatsApp Forward Risk Score

Example:

> Risk Level: High  
> Reason: Contains panic language and lacks verified sources.

---

## Government Scheme Verification

Verify authenticity of:
- Scholarships
- Recruitment notices
- Exam announcements
- Government schemes

---

## Voice Note Verification

Process:
1. User uploads audio
2. Speech-to-text conversion
3. Fake news detection on transcript

---

# MVP (Minimum Viable Product)

The first version should include:

- Text input
- Language detection
- Basic fake/real classification
- Confidence score
- AI explanation
- Fact-check references

---

# Future Enhancements

- Browser extension
- WhatsApp integration
- Mobile app
- Real-time social media monitoring
- Deepfake image/video detection
- Community reporting system

---

# Expected Outcomes

- Reduced spread of misinformation
- Better awareness of fake news
- Support for underserved regional languages
- Real-world social impact

---

# Resume Description

> Built a multilingual fake news detection platform for Indian regional languages using NLP, OCR, source credibility scoring, and Java Spring Boot, supporting Marathi, Hindi, and English claims.

---

# Why This Project Stands Out

- Solves a real-world social problem
- Uses modern AI/NLP technologies
- Supports underserved regional languages
- Has strong startup and research potential
- Combines full-stack + AI + OCR + NLP in one system

---

# Possible Project Names

- SatyaCheck
- Bharat FactGuard
- VerifyKaro
- TruthLens India
- Regional Truth AI
