var story
    function getStory(name) {
        return {
        currentScene: "attack",
        attack: {
            title: "Before queuing",
            story: `Welcome to the EPIC experience of playing Valorant with Cumtoes. You, ${name} , have decided to take the chance of being screamed at. A very brave, yet unwise decision.`,
            choices: [
                {
                    choice: "Yes, continue.",
                    destination: 'continuePlay'
                },
                {
                    choice: "Nope I change my mind, goodbye.",
                    destination: 'goHome'
                }
            ]
        },
        continuePlay: {
            title: "Pistol Round",
            story: "It is the first round of the game where everyone has pistols? What do you do?",
            choices: [
                {
                    choice: "Play on B without Seb.",
                    destination: 'madTeammate'
                },
                {
                    choice: "Play on A with Seb.",
                    destination: 'noTalk'
                }
            ]
        },
        goHome: {
            title: "See ya",
            story: "You are boring!",
            image: "you_suck.png",
            defaultDestination: 'attack',
            buttonText: "Try again?"
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#start-button')
    var content = document.querySelector('#content')
    button.addEventListener('click', function() {
        var name = document.querySelector(`#name-input`)
        story = getStory(name.value)
        renderScene()
    })
})

function renderScene() {
    var text = "Next"
    var image = "";
    if (story[story.currentScene].image) {
        image = "<img></img>"
    }
    if (story[story.currentScene].buttonText) {
        text = story[story.currentScene].buttonText
    }
    content.innerHTML = `
    <h1>${story[story.currentScene].title}<h1>
    <font size="+1">
    <p>${story[story.currentScene].story}</p>
    </font>
    ${image}
    ${getInputs()} 
    <button id = "submit-button">${text}</button>
    `
    if (story[story.currentScene].image) {
        document.querySelector("img").src = `./img/${story[story.currentScene].image}`
    }
    var button = document.querySelector('#submit-button');
    button.addEventListener('click', function() {
        getInputValue()
    })
}

function getInputValue() {
   var inputs = document.querySelectorAll('input[type="radio"]');
   for (var i = 0; i < inputs.length; i++) {
       if (inputs[i].checked) {
           story.currentScene = inputs[i].getAttribute('data-destination')
           renderScene();
           return;
       }
   }
   story.currentScene = story[story.currentScene].defaultDestination
   renderScene()
}

function getInputs() {
    var input = ""
    if (!story[story.currentScene].choices) {
        return ""
    }
    for(var i = 0; i < story[story.currentScene].choices.length; i ++) {
        input += `
        <font size="+1">
        <div>
        <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices"/>
        <label for "radio${i}" />${story[story.currentScene].choices[i].choice}</label>
    </div>
    </font>`
    
    }
return input;
}