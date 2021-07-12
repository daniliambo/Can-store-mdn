let json
async function fetching() {
  try {
    let response = await fetch('products.json')

    if (!response.ok) {
      throw new Error(response.status)
    } else {
      json = await response.json()
      init()
    }
  }
  catch (e) {
    console.log(e)
  }
}

function init() {
  console.log(json)

  const main = document.querySelector('main')
  const btn = document.querySelector('button')
  const input = document.querySelector('input')
  const select = document.querySelector('select')

  let catResult = []
  let finResult = json
  display()

  btn.addEventListener('click', selectfn)


  function selectfn() {
    catResult = []
    finResult = []
    console.log('1')
    selectParam = select.value.toLowerCase()
    console.log(selectParam)
    if (selectParam === 'all') {
      catResult = json
      console.log(catResult)
      inputfn()
    } else {
      for (i = 0;i < json.length;i++) {
        if (json[i].type === selectParam) {
          catResult.push(json[i])
        }
      }
      console.log(catResult)
      inputfn()
    }
  }

  function inputfn() {
    if (input.value === '') {
      console.log(input.value)
      finResult = catResult
      display()
    } else {
      for (const el of catResult) {
        if ((el.name.indexOf(input.value)) !== -1) {
          finResult.push(el)
        }
      }
      display()
    }
    console.log(finResult)
  }

  async function display() {

    while (main.firstChild) {
      main.removeChild(main.firstChild)
    }

    for (i = 0;i < finResult.length;i++) {
      const el = finResult[i]
      const url = './images/' + finResult[i].image
      let response = await fetch(url)
      let blob = await response.blob()
      const section = document.createElement('section')
      const para = document.createElement('p')
      const img = document.createElement('img')
      const h2 = document.createElement('h2')
      
      section.setAttribute('class', el.type)

      main.appendChild(section)
      section.appendChild(h2)
      section.appendChild(img)
      section.appendChild(para)
      src = URL.createObjectURL(blob)
      img.src = src
      para.textContent = '$' + el.price
      h2.textContent = el.name.replace(el.name.charAt(0), el.name.charAt(0).toUpperCase())
    }
  }
}

fetching()
