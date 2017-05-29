/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// require('dotenv').load();

var Botkit = require('botkit');
var express = require('express');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var translator = new LanguageTranslatorV2({
        "url": process.env.TRANSLATOR_URL,
        "username": process.env.TRANSLATOR_USERNAME,
        "password": process.env.TRANSLATOR_PASSWORD});

var middleware = {};

middleware.default = require('botkit-middleware-watson')({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
  version_date: '2016-09-20'
});

var convMiddleware = middleware.default;

// Configure your bot.
var slackController = Botkit.slackbot();
var slackBot = slackController.spawn({
  token: process.env.SLACK_TOKEN
});
slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  slackController.log('Slack message received');
  slackController.log(JSON.stringify(message));
  translator.identify({ text: message.text},
    function(err, identifiedLanguages) {
      if (err) {
        console.log(err)
      }
      else {
        var conWSEnv = "CONVERSATION_WORKSPACE_ID";
        var detectedLanguage = identifiedLanguages.languages[0].language;
        if (process.env[conWSEnv + "_" + detectedLanguage]) {
          conWSEnv = conWSEnv + "_" + detectedLanguage;
        }

        if (middleware[detectedLanguage]) {
          convMiddleware = middleware[detectedLanguage];
        }
        else {
          middleware[detectedLanguage] = require('botkit-middleware-watson')({
            username: process.env.CONVERSATION_USERNAME,
            password: process.env.CONVERSATION_PASSWORD,
            workspace_id: process.env[conWSEnv],
            version_date: '2016-09-20'
          });
          convMiddleware = middleware[detectedLanguage];
        }

        convMiddleware.interpret(bot, message, function(err) {
          if (!err)
      		  bot.reply(message, message.watsonData.output.text.join('\n'));
      	});
      }
    }
  );
});

slackBot.startRTM();

// Create an Express app
var app = express();
var port = process.env.PORT || 5000;
app.set('port', port);
app.listen(port, function() {
  console.log('Client server listening on port ' + port);
});

function detectLanguage(message, callback) {

}
