const click = new Audio("click.mp3")
let sound
function doClick() {
    if (sound) {
      click.load()
      click.play()
    }
}
function changeSound(click) {
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
    sessionStorage.setItem("sound",sound)
    if (click===undefined) {
      doClick()
    }
}
if (sessionStorage.getItem("sound")=="false") {
  sound = true
  changeSound(false)
} else {
  sound = false
  changeSound(false)
}
try {
    const results = document.getElementsByClassName("result")
    for (let i = 0; i < results.length; i++) {
        results[i].innerHTML=sessionStorage.getItem(results[i].id);
    }
} catch (err) {
    alert(err)
}
function redirect() {
    sessionStorage.setItem("sound",sound)
    doClick()
    window.location.href ="../"
}
function copy(result,id) {
    doClick()
    navigator.clipboard.writeText(sessionStorage.getItem(result))
    document.getElementById(id).innerHTML="Copied!"
}
function resetCopyText(id) {
    document.getElementById(id).innerHTML="Copy"
} 
function getMode(arr) {
  let freq = {}
  for (item of arr) {
    freq[item] ? freq[item]++ : freq[item] = 1
  }  
  let compare = 0
  let mode
  for (item in freq) {
    if (freq[item] > compare) {
      compare = freq[item]
      mode = item
    }
  }
  return parseInt(mode)
}
function calculateConsistency(array,range) {
  // const n = array.length
  // const mean = array.reduce((a, b) => a + b) / n
  // const cov = (Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n) / mean)*100
  // return cov
  let c = 0
  let f = getMode(array)
  for (x of array) {
    if ((x>(f-range))&&(x<(f+range))) {
      c+=1
    }
  }
  return (c/array.length)*100
}
const range = document.getElementById("iRange")
range.addEventListener('input', function() {
  document.getElementById("rangeNum").innerHTML = range.value
  sessionStorage.setItem("consistency",calculateConsistency(JSON.parse(sessionStorage.getItem("rawWPMs")),parseInt(range.value)).toFixed(2)+"%")
  document.getElementById("consistency").innerHTML = sessionStorage.getItem("consistency")
})