import React, {useState,useEffect} from "react";
// import axios from "axios";
import axiosInstance from "./axiosConfig";

interface quesType {
  id:number;
  question: string;
  answer:string;
};
const QuestionList = () => {
  const [quesList,setQuesList]=useState<quesType[]>([]);
  const fetchQuesList = async () => {
    // const res =await axios.get<quesType[]>("http://localhost:4000/questions")
    //                       .then((response)=>{setQuesList(response.data)});

    // setQuesList(res.data);
    const instance = axios.create(
      {
          baseURL:"http://localhost:4000",
          withCredentials:false,
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
      });
    await axiosInstance.get<quesType[]>("/questions")
               .then((response)=>{setQuesList(response.data);
              })
                .catch((error)=>{
                  alert(error);
                });
  };
  useEffect( () => {
    fetchQuesList();
  },[]);
  const renderedQuestions =quesList.map( (ques)=>{
    return(
      <div className="card" style={{width: "30%", marginBottom: "20%"}} key={ques.id}>
        <div className="card-body">
          <h3>{ques.question}</h3>
          {/* <AnswerCreate quesId={ques.id}/> */}
          {/* <AnswerList /> */}
        </div>
      </div>

    );  
  });
  return(
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedQuestions}
    </div>
  );

};
export default QuestionList;