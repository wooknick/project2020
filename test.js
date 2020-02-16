const API_KEY = "8761594736935015673";
const ANALYSIS_TYPE = "1"; // 0 : 감성분석, 1: 감정분석

const render = document.getElementById("render");
const reader = new FileReader();

reader.onload = e => {
    fileData = e.target.result;
    // myFunction with fileData
    console.log(fileData);
    // render.innerText = fileData;
    const fullText = fileData.split(/\n/);
    const fullSentense = [];
    fullText.map((paragraph, index) => {
        if (paragraph !== "") {
            let tmp = paragraph.split(/[.?!] /);
            tmp.forEach((sentence, index) => {
                tmp[index] = sentence.trim();
                if (sentence === "") {
                    tmp.splice(index, 1);
                }
            });
            fullSentense.push(tmp);
        }
    });
    console.log(fullSentense);
    // const analysisComplete = fullSentense.map((paragraph, index) => {
    //     const result = analysisParagraph(paragraph);
    //     return [...paragraph, result];
    // });
    // const analysisFullSentense = fullSentense.map((paragraph, index) => {
    //     paragraph.push("감정");
    // });
    analysisSentence(fullSentense[0][0]);
    // analysisSentence(fullSentense[0][0]);
    // console.log(analysisComplete);
};

const openFile = e => {
    reader.readAsText(e.target.files[0], "utf-8");
};

const analysisSentence = sentence => {
    fetch(
        `http://api.adams.ai/datamixiApi/omAnalysis?query=${sentence}&type=${ANALYSIS_TYPE}&key=${API_KEY}`
    )
        .then(response => {
            return response.json();
        })
        .then(json => {
            if ((json.result_code = "success" && json.return_object && json.return_object.Result)) {
                const {
                    return_object: { Result: result }
                } = json;
                console.log(result);
                return result;
            } else {
                return ["", ""];
            }
        });
};

const analysisParagraph = sentences => {
    const ret = [];
    sentences.forEach(sentence => {
        const result = analysisSentence(sentence);
        console.log(result);
        if (result[0] > 0.2) {
            ret.push(result[1]);
        }
    });

    return ret;
};
