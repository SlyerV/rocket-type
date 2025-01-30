// Sample texts (idk why I didn't use a .txt file)
// Generated by ChatGPT
const texts = ["rocket ships are incredible machines that allow humans to explore the vastness of space they are powered by massive engines that burn fuel to produce thrust propelling them upward and away from earths gravity with each launch they carry astronauts equipment and sometimes even satellites into orbit","building a rocket ship requires precise engineering and advanced technology every component must work perfectly together from the sturdy outer shell that protects it from extreme temperatures to the navigation systems that guide it through space the journey of a rocket ship is a testament to human innovation and perseverance","space exploration would not be possible without rocket ships they open the door to new discoveries about our universe enabling us to study distant planets moons and stars without these incredible vehicles our understanding of the cosmos would remain limited rocket ships symbolize the unending curiosity of humankind","the launch of a rocket ship is a breathtaking event massive clouds of smoke and fire erupt from the engines as it rises into the sky the sheer power and energy are awe inspiring millions of people around the world watch as these technological marvels embark on their journeys into the unknown","rocket ships have to overcome immense forces to leave earths atmosphere they travel at incredible speeds breaking through the layers of air and entering the vacuum of space once in orbit they glide silently around our planet","the first rocket ships were small and simple compared to the ones we have today over time advancements in science and engineering have made them larger more powerful and capable of traveling farther than ever before","astronauts rely on rocket ships to take them to space stations and beyond these vehicles are their lifeline carrying everything they need to survive including air water and food without rocket ships space travel would not be possible","fuel is one of the most important parts of a rocket ship it provides the energy needed to break free from gravity most rockets carry a mixture of liquid oxygen and fuel which burns to create the powerful thrust","rocket ships are designed to endure extreme conditions the heat during launch and reentry can reach thousands of degrees engineers use special materials to protect the ship and keep the astronauts inside safe","each launch requires months or even years of planning and preparation teams of scientists and engineers work together to ensure everything goes smoothly one small error could lead to a major problem","the dream of traveling to other planets starts with rocket ships these vehicles are the first step toward exploring places like mars and beyond they represent hope for a future where humans can live on other worlds","rockets are not just for human space travel they are also used to launch satellites into orbit these satellites provide us with communication weather forecasts and even gps navigation helping us stay connected on earth","the engines of a rocket ship are some of the most powerful machines ever built they burn fuel at an incredible rate generating enough force to lift the rocket and its payload into the sky against the pull of gravity","rocket ships must be lightweight yet strong to withstand the forces they encounter during launch and space travel materials like aluminum and carbon fiber are used to make them durable and efficient","the sight of a rocket ship soaring into the sky fills people with wonder and excitement it is a reminder of how far humanity has come and how much we can achieve when we work together to push the boundaries of what is possible","yo you found the not very rare bonus generated text good for you wait you may have looked into the code to find this and if you looked into the code gj but there is also a high possibility that you never looked into the code yet found this so that's cool as well"]
// Sounds
let sound=true
const key = new Audio("key.mp3")
const click = new Audio("click.mp3")
key.volume=0.75
function doClick() {
  if (sound) {
    click.load()
    click.play()
  }
}
function doKey() {
  if (sound) {
    key.load()
    key.play()
  }
}
let customized= false
let starttyping
// replaceAt function
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
document.getElementById('field').setAttribute('disabled', true);
// starttest func
// ik my code is rlly messy but hey it works! (sorta)
function starttest() {
  doClick()
  let text = ""
  const time = document.getElementById("time").value
  if (!customized) {
    if (time == 15) {
      text = texts[Math.floor(Math.random()*texts.length)]
    } else if (time == 30) {
      text = texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]
    } else if (time == 60) {
      text = texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]
    } else if (time == 120) {
      text = texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]+" "+texts[Math.floor(Math.random()*texts.length)]
    }
  } else {
    text=document.getElementById("customized").value
  }
  let resp = ""
  let i = 0
  let c = 0
  let e = 0
  let s = 0
  let oldResp = resp 
  let start = false
  document.getElementById('field').removeAttribute('disabled')
  document.getElementById('time').setAttribute('disabled',true)
  document.getElementById('start').setAttribute('disabled',true)
  document.getElementById('customize').setAttribute('disabled',true)
  document.getElementById('type').innerHTML = text
  document.getElementById('timeleft').innerHTML = time
  document.getElementById('errors').innerHTML = "0"
  document.getElementById('wpm').innerHTML = "0"
  let startTime = 0
  function typing() {
    document.getElementById("cancel").removeAttribute('hidden')
    if (start) {
      document.getElementById('timeleft').innerHTML = (time-((Date.now()-startTime)/1000)).toFixed(3)
      document.getElementById('errors').innerHTML = e
      document.getElementById('wpm').innerHTML = ((((i-s)/5)*(60/((Date.now()-startTime)/1000)))*((i-s)/((i-s)+e))).toFixed(1)
      if ((Date.now()-startTime>=(time*1000)) || (i==(text.length))) {
        i=i-s
        let wpm = (((i/5)*(60/((Date.now()-startTime)/1000)))*(i/(i+e))).toFixed(1)
        let raw = (((i/5)*(60/((Date.now()-startTime)/1000)))).toFixed(1)
        if (text.length<=1) {
          wpm="Infinity"
          raw="Infinity"
        }
        try {
          sessionStorage.setItem("wpm",wpm)
          sessionStorage.setItem("errors",e)
          sessionStorage.setItem("raw",raw)
          sessionStorage.setItem("chars",(i+e))
          sessionStorage.setItem("accuracy",((i/(i+e))*100).toFixed(2)+"%")
          clearInterval(starttyping)
          document.getElementById('timeleft').innerHTML = 0
          document.getElementById('errors').innerHTML = 0
          document.getElementById('wpm').innerHTML = 0
          document.getElementById('field').value=""
          document.getElementById('field').setAttribute('disabled',true)
          document.getElementById('time').removeAttribute('disabled')
          document.getElementById('start').removeAttribute('disabled')
          document.getElementById('customize').removeAttribute('disabled')
          document.getElementById('cancel').setAttribute('hidden',true)
          document.getElementById('title').classList.add('noanimation')
          document.getElementById('subtitle').classList.add('noanimation')
          window.location.href="../result"
          return
        } catch(err) {
          alert(err)
        }
      }
    }
    resp = document.getElementById('field').value
    if (oldResp!=resp) {
      doKey()
      if (!start) {
        start=true
        startTime=Date.now()
      }
      for (x of resp) {
        if ((text[i]==x) || (c<i) || (((text[resp.length-1]==resp[resp.length-1])))) {
          if (c>=i) {
            document.getElementById('type').innerHTML = text.replaceAt(i-1,"🚀")
            document.getElementById('field').value=text.slice(0,i+1)
            document.getElementById("field").style.color = "green"
            i+=1
          }
          c+=1
        } else if ((oldResp.length<resp.length)) {
          if ((resp.slice(oldResp.length).includes(" "))) {
            oldi=i
            for (x of text.slice(i)) {
              if ((text[i]==" ")&&(text[i+1]!=" ")) {
                i+=1
                s+=1
                break
              }
              i+=1
              s+=1
            }
            document.getElementById('field').value=text.slice(0,i)
            document.getElementById('type').innerHTML = text.replaceAt(i-1,"🚀")
          }
          document.getElementById("field").style.color = "red"
          if ((resp.length+1-i)>5) {
            document.getElementById('field').value=resp.slice(0,resp.length-1)
          } else {
            e+=1
            break
          }
        }
      }
    }
    c=0
    oldResp = resp
  }
  starttyping = setInterval(typing,0)
}
function changeTimeLeft() {
  doClick()
  const cTimeLeft = document.getElementsByClassName("cTimeLeft")
  const disabler = document.getElementById("disableTimeLeft")
  if (disabler.textContent == "Disable Counter") {
    for (let i = 0; i < cTimeLeft.length; i++) {
      cTimeLeft[i].setAttribute("hidden", true);
    }
    disabler.textContent = "Enable Counter"
    disabler.style.marginLeft = "0px"
  } else {
    for (let i = 0; i < cTimeLeft.length; i++) {
      cTimeLeft[i].removeAttribute("hidden");
    }
    disabler.textContent = "Disable Counter"
    disabler.style.marginLeft = "10px"
  }
}
function changeErrors() {
  doClick()
  const cErrors = document.getElementsByClassName("cErrors")
  const disabler = document.getElementById("disableErrors")
  if (disabler.textContent == "Disable Counter") {
    for (let i = 0; i < cErrors.length; i++) {
      cErrors[i].setAttribute("hidden", true);
    }
    disabler.textContent = "Enable Counter"
    disabler.style.marginLeft = "0px"
  } else {
    for (let i = 0; i < cErrors.length; i++) {
      cErrors[i].removeAttribute("hidden");
    }
    disabler.textContent = "Disable Counter"
    disabler.style.marginLeft = "10px"
  }
}
function changeWPM() {
  doClick()
  const cWPM = document.getElementsByClassName("cWPM")
  const disabler = document.getElementById("disableWPM")
  if (disabler.textContent == "Disable Counter") {
    for (let i = 0; i < cWPM.length; i++) {
      cWPM[i].setAttribute("hidden", true);
    }
    disabler.textContent = "Enable Counter"
    disabler.style.marginLeft = "0px"
  } else {
    for (let i = 0; i < cWPM.length; i++) {
      cWPM[i].removeAttribute("hidden");
    }
    disabler.textContent = "Disable Counter"
    disabler.style.marginLeft = "10px"
  }
}
function openCustomization() {
  doClick()
  document.getElementById("customization").style.display="block"
}
function closeCustomization() {
  doClick()
  document.getElementById("customization").style.display="none"
  document.getElementById("customized").value=""
}
function saveCustomization() {
  doClick()
  if (document.getElementById("customized").value.length>=1) {
    customized=true
    document.getElementById("customization").style.display="none"
  }
}
function disableCustomization() {
  doClick()
  customized=false
  document.getElementById("customization").style.display="none"
  document.getElementById("customized").value=""
}
function cancelTest() {
  doClick()
  try {
    clearInterval(starttyping)
  } catch(err) {
    alert(err)
  }
  document.getElementById('timeleft').innerHTML = 0
  document.getElementById('errors').innerHTML = 0
  document.getElementById('wpm').innerHTML = 0
  document.getElementById('field').value=""
  document.getElementById('field').setAttribute('disabled',true)
  document.getElementById('time').removeAttribute('disabled')
  document.getElementById('start').removeAttribute('disabled')
  document.getElementById('customize').removeAttribute('disabled')
  document.getElementById('cancel').setAttribute('hidden',true)
}
function changeSound() {
  if (sound) {
    sound=false
    try {
      document.getElementById("soundIcon").classList.remove('fa-volume-up')
      document.getElementById("soundIcon").classList.add('fa-volume-mute')
    } catch(err) {
      alert(err)
    }
  } else {
    sound=true
    document.getElementById("soundIcon").classList.add('fa-volume-up')
    document.getElementById("soundIcon").classList.remove('fa-volume-mute')
  }
  doClick()
}
