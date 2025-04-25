const keyboardLayouts = {
    english: {
        default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "z x c v b n m {space} {bksp}"
        ],
        shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "Z X C V B N M {space} {bksp}"
        ]
    },
    hindi: {
        default: [
            "ऄ अ आ इ ई उ ऊ ऋ ए ऐ ओ औ {bksp}",
            "क ख ग घ ङ च छ ज झ ञ ट ठ ड",
            "ढ ण त थ द ध न प फ ब भ म {enter}",
            "य र ल व श ष स ह ळ क्ष ज्ञ",
            "{space}"
        ]
    },
    french: {
        default: [
            "a z e r t y u i o p",
            "q s d f g h j k l m",
            "w x c v b n , . ; : {space} {bksp}"
        ],
        shift: [
            "A Z E R T Y U I O P",
            "Q S D F G H J K L M",
            "W X C V B N ? / . ! {space} {bksp}"
        ]
    },
    japanese: {
        default: [
            "ぬ ふ あ う え お や ゆ よ わ ほ へ {bksp}",
            "た て い す か ん な に ら せ ゛ ゜",
            "ち と し は き く ま の り れ け {enter}",
            "つ さ そ ひ こ み も ね る め",
            "{space}"
        ]
    },
    korean: {
        default: [
            "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ",
            "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
            "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {space} {bksp}"
        ]
    },
    german: {
        default: [
            "q w e r t z u i o p ü",
            "a s d f g h j k l ö ä",
            "y x c v b n m , . - {space} {bksp}"
        ],
        shift: [
            "Q W E R T Z U I O P Ü",
            "A S D F G H J K L Ö Ä",
            "Y X C V B N M ; : _ {space} {bksp}"
        ]
    }
};

export default keyboardLayouts;
