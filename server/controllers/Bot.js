const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
require("dotenv").config();
const gemini_key=process.env.API_KEY_GEMINI;
const genAI = new GoogleGenerativeAI(gemini_key);

exports.botres = async (req, res) => {
	try {
		const queryText = req.body.queryText;

		console.log("hi");
		console.log(req.body);

	// 	const model = genAI.getGenerativeModel({ model: "gemini-pro" });
	// 	const result = await model.generateContent(queryText);
	// 	const response = result.response;
    // var text = response.text();
    var text="कीथ हाल ही में शिकागो, इलिनॉय से एक यात्रा से लौटा है। यह मध्य-पश्चिमी बड़े शहर को मिशिगन झील के किनारे पाया जाता है। अपने यात्रा के दौरान, कीथ ने शहर के महत्वपूर्ण स्थलों और स्मारकों को देखने के लिए कई समय बिताया।कीथ को बेसबॉल का बहुत शौक है, और उसने सुनिश्चित किया कि उसने रिग्ली फील्ड का दौरा किया। उसने इस शानदार स्टेडियम का टूर नहीं ही किया, बल्कि उसने एक शिकागो कब्स का मैच देखा भी। स्टेडियम में, कीथ और अन्य फैन्स ने कब्स के लिए शोर मचाया। कीथ को खुशी हुई कि कब्स ने 5-4 के स्कोर के साथ जीत हासिल की।शिकागो में बहुत से ऐतिहासिक स्थल हैं। कीथ को शिकागो वॉटर टॉवर प्रभावशाली लगा क्योंकि यह 1871 के ग्रेट शिकागो आग से बचे हुए कुछ ही स्मारकों में से एक है। कीथ ने जैक्सन पार्क के माध्यम से एक सैर की भी, जो 1892 की विश्व मेला को होस्ट करने वाली एक महान आउटडोर स्थल है। पार्क एक धीरे-धीरे होने वाले स्ट्रॉल के लिए शानदार है, और इसमें विश्व मेला में प्रदर्शित हुए कुछ मौद्रिकों के मूल स्थान और प्रतिरूप हैं।उसकी यात्रा के अंतिम हिस्से के दौरान, कीथ ने विलिस टॉवर के अंदर सीढ़ियों को चढ़ने का समर्थन किया। बहुत सी सीढ़ियों को चढ़ने के चुनौतीपूर्ण कारण, कीथ ने महसूस किया कि शीर्ष तक पहुंचना यात्रा के लायक था। छत से, कीथ ने शहर की स्काईलाइन का खूबसूरत दृश्य और पीछे मिशिगन झील को प्राप्त किया।"
    console.log('text is ', text);

		if (!queryText) {
			return res.status(400).json({
				success: false,
				message: "Please enter query",
			});
		}

		return res.status(201).json({
			success: true,
			data: text,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Bot is busy ask after  some time!",
		});
	}
};
