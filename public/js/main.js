// import axios from "axios";

const startCreating= document.querySelector('.startCreating');
const promptDiv= document.querySelector('.promptDiv');

startCreating.addEventListener('click', (evt)=>{
	evt.preventDefault();
	promptDiv.scrollIntoView({behavior: "smooth"});
});

const promptForm= document.querySelector('#imagePrompt');

const generateImageRequest= async (prompt) => {
	try{
		showSpinner();
		const res= await axios({
			method: 'POST',
			url: '/generate-image',
			data: {
				prompt: prompt
			},
			withCredentials: true
		});

		if(res.data.status === "Success"){
			const imageUrl = res.data.data;
			document.querySelector('#image').src = imageUrl;
			removeSpinner();
			setTimeout(() =>{
				document.querySelector('#image').scrollIntoView({behavior: "smooth"});
			},2800);
			
		}
		else{
			removeSpinner();
			throw new Error('That image could not be generated');
		}
	} catch(err){
		//print error to front end
		document.querySelector('.msg').textContent = err;
	}
}

if(promptForm){
	promptForm.addEventListener('submit', (evt)=>{
		evt.preventDefault();
		const prompt = document.querySelector('#promptInput').value;

		if(!prompt){
			alert('Please add some text');
			location.reload();
		}
		else{
			generateImageRequest(prompt);
		}
	});
}



function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}
