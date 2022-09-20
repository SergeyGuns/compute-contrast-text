import './App.css'
import data from './data.json'
import { computeGrayContrast } from './compute-gray-contrast.js'
const DARK = '#000000';
const LIGHT = '#FFFFFF';
const PROP = {
  N: "№",
  NAME: "Название банка",
  LOGO_MB: "Логотип МБ",
  LOGO_IB: "Логотип ИБ",
  BACKGROUND: "Фон (hex)",
  BIN: "БИН",
}
const DEFAULT_TEXT_COLOR = '#656871'
const TEXT = 'Переводы осуществляются только в рублях РФ и только между картами банков, зарегистрированных в РФ.'
export default function App() {
  return (

    <main>
      <hr />
      Инверсия <br />
      {data.map(bank => {
        const color = invertColor('#' + bank[PROP.BACKGROUND])
        const backgroundColor = '#' + bank[PROP.BACKGROUND]
        console.log({ color, backgroundColor })
        return (
          <div className='card' key={bank[PROP.NAME]} style={{ backgroundColor }}>
            <span style={{ color }}>
              {bank[PROP.NAME]}
              <p>{TEXT}</p>
            </span>

          </div>)

      })}
      <hr />
      Белый текст, черный фон <br />
      <div className='card' style={{ backgroundColor: 'rgb(77, 157, 70)' }} >
        {
          ('variant 2 \n' + TEXT).split('').map(letter => <span style={{ backgroundColor: 'black', color: 'white' }} >{letter}</span>)
        }
      </div>
      <hr />
      Контрастный серый текст <br />
      {data.map(bank => {
        const color = computeGrayContrast(DARK, LIGHT)('#' + bank[PROP.BACKGROUND])
        const backgroundColor = '#' + bank[PROP.BACKGROUND]
        console.log({ color, backgroundColor })
        console.log(bank)
        return (
          <div className='card' key={bank[PROP.NAME]} style={{ backgroundColor }}>
            <span style={{ color }}>
              {bank[PROP.NAME]}
              <p>{TEXT}</p>
            </span>

          </div>)

      })}
    </main >
  )
}

// function invertColor(HEXColor) {
//   if (HEXColor === undefined) {
//     return DEFAULT_TEXT_COLOR
//   }
//   let inverseColor = '#'
//   const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
//   const reversedColor = [...colors].reverse()
//   try {
//     HEXColor.replace('#', '')
//       .split('')
//       .forEach((i) => {
//         const index = colors.indexOf(i)
//         inverseColor += reversedColor[index + 1]
//       })
//     return inverseColor
//   } catch (e) {
//     return inverseColor || DEFAULT_TEXT_COLOR
//   }
// }
function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
