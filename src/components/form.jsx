import React from "react";
import FirstResume from "./resume1";


var obj
function Form(){
    var [height,cH]=React.useState(false)
    var [Address,cA]=React.useState({
        email:"hello@123gmail.com",
        phone:"+91-112-221",
        linkedin:"hello",
        address:"23 Anywhere St., Any City"
    });
    function changeHeight(){
        
        cH(!height);
    }
    var [state,changeinfo]=React.useState({
        name:"HOWARD ONG",
        des:"Financial Analyst"
    })
    obj=state;

    function change(event){
        
            changeinfo((pvalue)=>{
                if(event.target.name==="name"){
                    return{
                        ...pvalue,
                        name:event.target.value
                    }
                }
                else if(event.target.name==="des"){
                    return{
                        ...pvalue,
                        des:event.target.value
                    }
                }
            })
    }
    // var style={
    //      margin:"100px auto 0 auto"
    // }
    var style2={
        opacity:1,
        visibility: "visible"
    }
    var style3={
       height:200
    }
    function changeAddress(event){
             cA((pvalue)=>{
               if(event.target.name==="email"){
                return{
                    ...pvalue,
                    email:event.target.value
                }
               }
               else if(event.target.name==="phone"){
                return{
                    ...pvalue,
                    phone:event.target.value
                }
                
               }
               else if(event.target.name==="address"){
                return{
                    ...pvalue,
                    address:event.target.value
                }
                
               }
               else if(event.target.name==="linkedin"){
                return{
                    ...pvalue,
                    linkedin:event.target.value
                }
                
               }
             })
    }
    var value="";
    function changeHardskill(event){
           value=event.target.value;
           
    }
    var [Skill,ChangeSkill]=React.useState([
        {
            id:0,
            content:"Financial modeling and reporting"
        },
        {
            id:1,
            content:"Data mining and analysis"
        },
        {
            id:2,
            content:"Financial accounting"
        },
        {   id:3,
            content:"usiness valuation"
        },
        {   id:4,
            content:"Advanced SAS proficienc"
        }
    ]);
    
    function submit(event){
       event.preventDefault();
    }
    var [count,increaseCount]=React.useState(4);
    // function add(){
        
        
    //     // var count=0;
    //     if(count>=5){
    //         // console.log(Skill.length)
    //         var x={
    //             id:count,
    //             content:value
    //         }
    //         ChangeSkill((prevSkills)=>{
    //             var updatedSkills = [...prevSkills,x];
    //             increaseCount((count)=>count+1);
    //             return updatedSkills;
    //         })
    //     }
    //     else{
    //         ChangeSkill((prevSkills) => {
    //             var updatedSkills = [...prevSkills];
    //             updatedSkills[count].content = value;
    //             increaseCount((count)=>count+1);
    //             //console.log(count);
    //             return updatedSkills;
    //           });
    //     }
        
    //        ChangeSkill((pvalue)=>{
    //             var c=[...pvalue];
    //             // c=c.filter((value,index)=>{
    //             //     //console.log(index);
    //             //     return index!==id;
    //             // })
    //             // var elementToRemove=c[id].content;
    //             // c = c.filter((element,index) => {
    //             //     console.log(element.id);
    //             //     return index!==id;
    //             // });
    //             var indexToRemove;
    //             for(var j=0;j<c.length;j++){
                   
    //                 if(c[j].id===id){
    //                     indexToRemove=j;
    //                 }
    //             }
    //             c.splice(indexToRemove, 1);
    //             increaseCount((count)=>count+1);
    //             return c;
    //        })
           
    // }
    return(
        <div>
        {/* <form  className="form" onSubmit={submit} action="" style={style}>
            <div className="personal-info" style={height?style3:null} >
                <h6>personal info <span className="plus" onClick={changeHeight} >+</span></h6>
                
            <label style={height?style2:null} htmlFor="#name">Your name : </label>
            <input style={height?style2:null} type="text" id="name" name="name" onChange={change}/>
            <br />
            <label style={height?style2:null} htmlFor="#des">short description : </label>
            <input style={height?style2:null} type="text" id="des" name="des" onChange={change}/>
            <br />
            </div>
            <div className="contact-info"  >
                <h6>My Contact <span className="plus"  >+</span></h6>
                
            <label  htmlFor="#email">email : </label>
            <input onChange={changeAddress}  type="email" id="email" name="email"/>
            <br />
            <label  htmlFor="#phone">phone : </label>
            <input onChange={changeAddress}  type="tel" id="phone" name="phone" />
            <br />
            <label  htmlFor="#linkedin">linkedIn : </label>
            <input onChange={changeAddress}  type="text" id="linkedin" name="linkedin" />
            <br/>
            <label  htmlFor="#address">Address : </label>
            <input onChange={changeAddress}  type="text" id="address" name="address" />
            <br/>
            
            </div>

            
            
            
            
        </form> */}
        {/* <FirstResume name={obj.name} des={obj.des} address={Address.address} email={Address.email} phone={Address.phone} linked={Address.linkedin} skill={Skill} onChecked={deleteList}/> */}
        <FirstResume  name={obj.name} des={obj.des} address={Address.address} email={Address.email} phone={Address.phone} linked={Address.linkedin} skill={Skill} />
        </div>
    )
}
export default Form;
