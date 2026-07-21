# QuikSwipe

-  make 2 files html file 
-  and js files
- use tailwind and bun to install packages
- an images folders stores all images

## the idea
Prompt: "I want to make chicken fry" / "I need running shoes" / "throw a birthday party"
Clarify (new step): AI asks 1-3 targeted follow-ups only when the prompt is open-ended or under-specified:

Cooking: "How many people?" "Any spice preference?" "Vegetarian substitutes needed?"
Shopping: "What's your budget?" "Casual or performance running shoes?" "Any brand preference?"
Event: "How many guests?" "Indoor or outdoor?" "Budget range?"
Skip this step entirely if the prompt is already specific ("2 chicken fry, medium spicy, for 4 people") — don't ask questions you can already answer.


Roadmap: AI generates the category breakdown based on prompt + clarifying answers
Swipe-to-cart: user swipes per category
Checkout: Prava executes payment across the full cart

## the idea
this is a prototype. so this site is entirely run on client side. so no backend.
and no functional AI.


## catergories

Cooking/Recipe Commerce — prompt → recipe → ingredient swipe-cart → Prava checkout. Most relatable, fastest to demo.
Event Planning — birthday, house party, gathering. Multi-category cart (catering, decor, cake) shows the agent handling real complexity.
Travel/Trip Planning — flights + stay + activities. Good for showing multi-vendor comparison and budget guardrails.
New Home/Dorm Setup — "just moved in" → furniture + essentials. Bigger cart, higher price range, makes autonomous payment feel meaningful.
General Shopping — open-ended "I need running shoes" or "back to school supplies" → AI curates a swipe feed across products/vendors instead of a generic search results page → Prava checks out. This is the most flexible category and doubles as your fallback demo for anything that doesn't fit the other four.