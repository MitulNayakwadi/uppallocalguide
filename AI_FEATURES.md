# 🤖 AI-Powered Features Guide

## Overview
Your Uppal Kalan Street Food Guide now includes intelligent recommendations powered by Google's Gemini AI!

## 🎯 How AI Recommendations Work

### 1. Quick Recommendation Buttons
Pre-configured queries for common scenarios:

```
🍛 Budget Biryani
   → "I want authentic biryani under ₹200"

🥗 Healthy Breakfast
   → "Looking for healthy vegetarian breakfast"

🌮 Evening Snacks
   → "Best street food for evening snacks"

👨‍👩‍👧‍👦 Family Dining
   → "Family-friendly restaurant with variety"

🌶️ Spicy Local Food
   → "Spicy Telangana food experience"
```

### 2. Custom Text Input
Describe exactly what you want in natural language:

**Examples:**
- "I'm craving spicy biryani but only have ₹150"
- "Need a quick breakfast spot near Uppal Market"
- "Looking for vegetarian options with good ratings"
- "Best place for authentic Telangana food"
- "Where can I get fresh dosas in the morning?"
- "Family dinner spot with parking and AC"

### 3. AI Processing
The Gemini AI:
1. **Understands** your preferences and constraints
2. **Analyzes** all 5 restaurants in the database
3. **Matches** based on:
   - Cuisine type
   - Price range
   - Ratings
   - Location
   - Specialties
   - Features (parking, AC, etc.)
   - Dietary options
   - Timing

### 4. Personalized Response
You receive:
- **Understanding**: What the AI interpreted from your request
- **Top Recommendations**: 2-3 best matches with reasons
- **Specific Dishes**: What to order at each place
- **Helpful Tips**: Best time to visit, price expectations, etc.

## 💡 Sample Interactions

### Example 1: Budget-Conscious Student
**User Input:**
```
"I'm a student looking for filling food under ₹100"
```

**AI Response:**
```
🎯 AI Recommendations for You

I understand you're looking for affordable, filling meals within a ₹100 budget.

Top Recommendations:

1. South Indian Tiffin Center (₹40-120)
   - Perfect for your budget! Their idli-sambar combo and dosas are 
     filling and nutritious
   - Recommended: Pesarattu with chutney (₹60) - protein-rich and filling
   - Best time: 7:30-9:30 AM for fresh preparation

2. Uppal Market Samosa Corner (₹20-80)
   - Great for quick, budget-friendly meals
   - Try: 2 samosas + chai (₹50) or vada plate (₹40)
   - Open all day, perfect for any meal

Tips: Both places are vegetarian-friendly and offer excellent value!
```

### Example 2: Biryani Lover
**User Input:**
```
"Best biryani in Uppal? I love spicy food"
```

**AI Response:**
```
🎯 AI Recommendations for You

For authentic, spicy biryani, I have the perfect recommendation!

Top Pick:

1. Biryani House Uppal (₹120-280) ⭐ 4.5/5
   - Authentic dum pukht method with traditional Hyderabadi spices
   - Highly rated (234 reviews) for consistent quality
   - Recommended: Mutton Biryani (₹250) - perfectly spiced
   - They can adjust spice levels - ask for "extra spicy"
   
What to order:
- Mutton Biryani with extra raita
- Mirchi ka Salan on the side
- Kebabs as starter

Best time: Lunch (12-2 PM) or dinner (7-9 PM)
Pro tip: Weekends get busy, so arrive early or order takeaway!
```

### Example 3: Family Outing
**User Input:**
```
"Family dinner spot with variety, need parking and AC"
```

**AI Response:**
```
🎯 AI Recommendations for You

For a comfortable family dining experience with variety:

Perfect Match:

1. IKEA Food Court Area (₹80-300) ⭐ 4.0/5
   - Multi-cuisine options (Indian, Continental, Chinese)
   - Spacious, AC, ample parking, wheelchair accessible
   - Something for everyone in the family
   - Clean, modern environment
   
Alternative:

2. Biryani House Uppal (₹120-280) ⭐ 4.5/5
   - AC, parking available, family-friendly
   - Vegetarian and non-vegetarian options
   - Traditional ambiance
   
Tips: IKEA food court is best for diverse preferences, while 
Biryani House is perfect if everyone loves Indian food!
```

## 🔍 What Makes It Smart?

### Context Understanding
The AI understands:
- **Budget constraints**: "under ₹100", "cheap", "affordable"
- **Time preferences**: "breakfast", "evening snacks", "quick lunch"
- **Dietary needs**: "vegetarian", "vegan", "halal"
- **Occasion**: "family", "date", "quick bite", "celebration"
- **Preferences**: "spicy", "authentic", "healthy", "traditional"
- **Requirements**: "parking", "AC", "delivery", "takeaway"

### Smart Matching
Considers multiple factors:
- Price range alignment
- Cuisine match
- Rating and popularity
- Location convenience
- Available features
- Timing (open hours)
- Specialty dishes

### Conversational Responses
- Friendly, local expert tone
- Specific recommendations with reasons
- Actionable tips and suggestions
- Clickable restaurant names (jump to map)

## 🎨 Interactive Features

### Clickable Restaurant Names
In AI responses, restaurant names are clickable:
- Click → Focuses on map
- Shows exact location
- Displays full details
- Highlights restaurant card

### Real-time Processing
- Loading indicator while AI thinks
- Smooth animations
- Error handling with helpful messages
- Scroll to response automatically

## 📊 Technical Details

### API Integration
- **Model**: Google Gemini Pro
- **Response Time**: 2-5 seconds
- **Context**: All restaurant data included
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1024 (detailed responses)

### Data Provided to AI
For each restaurant:
- Name and type
- Cuisine categories
- Price range
- Rating and review count
- Specialties
- Location and area
- Full description
- Features (parking, AC, etc.)

### Response Format
- Markdown-style formatting
- Bold for emphasis
- Structured sections
- Bullet points for clarity
- Conversational tone

## 🚀 Best Practices

### For Best Results:
1. **Be specific**: "spicy biryani under ₹200" vs "food"
2. **Mention constraints**: Budget, time, dietary needs
3. **State preferences**: Cuisine type, ambiance, features
4. **Ask naturally**: Write like you're asking a friend

### Example Good Queries:
✅ "I want authentic Telangana breakfast under ₹100"
✅ "Best place for evening chaat with friends"
✅ "Family-friendly restaurant with vegetarian options"
✅ "Quick lunch near IKEA, budget ₹150"

### Example Vague Queries:
❌ "food"
❌ "restaurant"
❌ "something good"

(AI will still try to help, but results will be less personalized)

## 🔮 Future Enhancements

Potential AI features:
- Voice input for recommendations
- Image recognition (upload food photos)
- Dietary restriction analysis
- Personalized learning (remember preferences)
- Multi-language support
- Comparison mode (compare 2 restaurants)
- Menu item recommendations
- Price prediction based on order

## 💬 Feedback

The AI learns from context but doesn't store personal data. Each query is independent and processed fresh with current restaurant data.

---

**Ready to try?** Open `index.html` and click the AI Recommendations section! 🎉
