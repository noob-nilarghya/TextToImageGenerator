
const {Leap} = require('@leap-ai/sdk');
const leap = new Leap(process.env.LEAP_API_KEY);

exports.generateImage= async (req, res) => {

    const prompt = req.body.prompt;

    try{

        //stable diffusion 1.5
		leap.usePublicModel("sd-1.5");

		//generate the image by passing in the prompt, using leap SDK
		const response = await leap.generate.generateImage({
			prompt: prompt,
		});
		console.log(response);
		const imageUrl = response.data.images[0].uri;

		//send JSON response to front end, with the data being the image in this case
		res.status(200).json({
			status: "Success",
			data: imageUrl
		});

    } catch(error){

        // For developer
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } 
        else { console.log(error.message); }

        res.status(400).json({
			status: "Fail",
			error: 'The image could not be generated'
		});
    }
}