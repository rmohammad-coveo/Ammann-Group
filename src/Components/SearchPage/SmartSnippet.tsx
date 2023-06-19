import React from "react";
import { Theme } from "../../theme";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "atomic-smart-snippet": AtomicSmartSnippetProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "atomic-smart-snippet-suggestions": AtomicSmartSnippetProps;
    }
  }
}

interface AtomicSmartSnippetProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

const SmartSnippet: React.FC = () => {
  const searchInterface = document.querySelector("atomic-search-interface");
  searchInterface?.i18n?.addResourceBundle("en", "translation", {
    "smart-snippet-people-also-ask": "People also ask",
    "smart-snippet-feedback-inquiry": "Was this information useful?",
    "smart-snippet-feedback-thanks": "Thank you for the feedback!",
    "smart-snippet-feedback-explain-why": "Explain why",
    "smart-snippet-feedback-select-reason" : "Select the reason",
    "smart-snippet-feedback-reason-does-not-answer" : "This didn't answer my question at all",
    "smart-snippet-feedback-reason-partially-answers" : "This only partially answered my question",
    "smart-snippet-feedback-reason-was-not-a-question" : "My request wasn't meant to be perceived as a question",
    "smart-snippet-feedback-reason-other" : "Others",
    "smart-snippet-feedback-send" : "send",
    "show-more": "show more",
    "show-less": "show less",
  });

  return (
    <>
    <style>
      {myStyles}
    </style>
      <atomic-smart-snippet></atomic-smart-snippet>
      <atomic-smart-snippet-suggestions></atomic-smart-snippet-suggestions>
    </>
  );
};

export default SmartSnippet;


const myStyles = `

atomic-smart-snippet {
  margin-bottom : 10px
}


atomic-smart-snippet::part(answer){
  font-weight: 300;
  color : ${Theme.excerpt}
}


atomic-smart-snippet::part(answer) b {
  font-weight: 400 !important;
  color : ${Theme.excerpt}
}

atomic-smart-snippet::part(source-title){
  color : ${Theme.link};
  font-weight : 400;
  font-size : 20px;
}

atomic-smart-snippet-suggestions::part(answer){
  font-weight: 300;
  color : ${Theme.excerpt}
}

atomic-smart-snippet::part(question){
  font-weight: 400;
  font-size: 18px;
}

atomic-smart-snippet-suggestions::part(source-title){
  font-weight: 400;
  color : ${Theme.link};
  font-size : 20px;
}

atomic-smart-snippet-suggestions::part(question-text-collapsed){
  font-weight: 400;
  font-size: 18px;
}

atomic-smart-snippet-suggestions::part(question-text-expanded){
  font-weight: 400;
  font-size: 18px;
}

`
