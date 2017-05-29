# Multi-language chatbot
The Bluemix catalogue provides many Watson service APIs that you can use to enhance your chatbot. In this demo, I'll use the Language Translator API and the Watson Conversation language to create a chatbot that support multi-languages. The chatbot automatically detects the language used in the conversation and responds accordingly. This demo is based on the Watson Developer Cloud's [botkit-middleware](https://github.com/watson-developer-cloud/botkit-middleware), which provides interfaces for Slack, Facebook, and Twilio clients.

## Bot Setup
You'll need to acquire a SLACK token (Bot User OAuth Access Token) to connect to a SLACK bot user. If you haven't got one, you can follow the following [Botkit's instructions](https://github.com/howdyai/botkit) to create one.

Follow [botkit-middleware](https://github.com/watson-developer-cloud/botkit-middleware) to understand how botkit works on Bluemix.

You'll need to have a Bluemix account to create an instance of Language Translator and Watson Conversation service and deploy the sample app. If you don't have an account, you can register a free trial account [here](https://console.ng.bluemix.net/registration/)

Create a Language Translator and Watson Conversation service instance via the Bluemix catalogue (./images/Bluemix_Catalog_Watson.png)
