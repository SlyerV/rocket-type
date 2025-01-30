const click = new Audio("click.mp3")
let sound=true
try {
    const results = document.getElementsByClassName("result")
    for (let i = 0; i < results.length; i++) {
        results[i].innerHTML=sessionStorage.getItem(results[i].id);
    }
} catch (err) {
    alert(err)
}
function redirect() {
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
function doClick() {
    if (sound) {
      click.load()
      click.play()
    }
}