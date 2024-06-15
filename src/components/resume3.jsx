import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
function ResumeThree(){
    const pdfRef=useRef();
    var [showform,Visible]=React.useState(false);
    var [showform2,Visible2]=React.useState(false);
    var [count,IncrementCount]=React.useState(0);
    var [count2,IncrementCount2]=React.useState(0);
    var [path,functiontopath]=React.useState("../images/monkey.png");
    

        const download=()=>{
            
            const input=pdfRef.current;
            // setTimeout(()=>{
                var addsection=document.querySelectorAll(".after-delete");
                addsection.forEach((a)=>{
                       a.classList.add("temp-remove");
                })
                

            // },5000);
            
            // html2canvas(input).then((canvas)=>{
            //     const imgData=canvas.toDataURL('image/png');
            //     const pdf=new  jsPDF('p','mm','a4',true);
            //     const pdfWidth=pdf.internal.pageSize.getWidth();
            //     const pdfHeight=pdf.internal.pageSize.getHeight();
            //     const imgWidth=canvas.width;
            //     const imgHeight=canvas.height;
            //     const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
            //     const imgX=(pdfWidth-imgWidth*ratio)/2;
            //     const imgY=30;
            //     pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
            //     pdf.save('Resume.pdf');
            // });
            
              console.log(input.innerHTML);
              const x={
                "user":"test",
                "id":3,
                "data":input.innerHTML
              }
            fetch("http://localhost:5000/",{
                method:'get',
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                },
                body: JSON.stringify(x), // Serialize the data
            }).then((res)=>{
                console.log("hello");
            })
            addsection.forEach((a)=>{
                a.classList.remove("temp-remove");
         })

        };
    
    function chagephoto(event){
        var file=event.target.files[0];
        functiontopath(URL.createObjectURL(file));
    }
    function showForm(){
           Visible(true);
    }
    function showForm2(){
        Visible(false);
    } 
    function showForm3(){
        Visible2(true);
 }
 function showForm22(){
     Visible2(false);
 } 
    var [set,Setsection]=React.useState({
        id:count,
        heading:null,
        boldHeading:null,
        lightHeading:null,
        paragraph:null
    })
    var [set2,Setsection2]=React.useState({
        id:count2,
        heading:null,
        boldHeading:null,
        lightHeading:null,
        paragraph:null
    })
    var [list,appendList]=React.useState([]);
    var [list2,appendList2]=React.useState([]);
    function addSecton(event){
             var name=event.target.name;
             var value=event.target.value;
             Setsection((pvalue)=>{
               if(name==="heading"){
                return{
                    ...pvalue,
                     heading:value
                }
                

                

               }
               if(name==="boldHeading"){
                return{
                    ...pvalue,
                    boldHeading:value
                }
                

                

               }
               if(name==="lightHeading"){
                return{
                    ...pvalue,
                    lightHeading:value
                }
               }
               if(name==="paragraph"){
                return{
                    ...pvalue,
                    paragraph:value
                }
               }

             })

    }
    function addSecton2(event){
        var name=event.target.name;
        var value=event.target.value;
        Setsection2((pvalue)=>{
          if(name==="heading2"){
           return{
               ...pvalue,
                heading:value
           }
           

           

          }
          if(name==="boldHeading2"){
           return{
               ...pvalue,
               boldHeading:value
           }
           

           

          }
          if(name==="lightHeading2"){
           return{
               ...pvalue,
               lightHeading:value
           }
          }
          if(name==="paragraph2"){
           return{
               ...pvalue,
               paragraph:value
           }
          }

        })

}
    function AddSection(event){
        appendList((pvalue)=>[...pvalue,set])
        IncrementCount(++count);
        Setsection({
            
                boldHeading:"",
                heading:"",
                lightHeading:"",
                paragraph:""
            

        });
        event.preventDefault();
    }
    function AddSection2(event){
        appendList2((pvalue)=>[...pvalue,set2])
        IncrementCount2(++count2);
        Setsection2({
            
                boldHeading:"",
                heading:"",
                lightHeading:"",
                paragraph:""
            

        });
        event.preventDefault();
    }
    function deleteItem(ind){
        
        
        appendList(list.filter((element,index)=>{
            return index!==ind;
        }))
    }
    function deleteItem2(ind){
        
        
        appendList2(list2.filter((element,index)=>{
            return index!==ind;
        }))
    }
    function Addlist(items,index){
          return(
            <div>
                    <div style={items.heading?{visibility:"visible"}:{visibility:"hidden"}} className="r3-box">
                        <p>{items.heading}</p>
                    </div>
                    <p style={items.boldHeading?{visibility:"visible"}:{visibility:"hidden"}} className="r3-dark">{items.boldHeading}</p>                   
                     <p style={items.lightHeading?{visibility:"visible"}:{visibility:"hidden"}} className="r3-info-below-dark">{items.lightHeading}</p>
                     <p style={items.paragraph?{visibility:"visible"}:{visibility:"hidden"}} className="r3-info-below-dark">{items.paragraph}</p>
                     <button className="after-delete" onClick={()=>{
                        deleteItem(index);
                        }}>Delete</button>
                </div>
          )
    }
    function Addlist2(items,index){
        return(
          <div>
                  <div style={items.heading?{visibility:"visible"}:{visibility:"hidden"}} className="r3-box">
                      <p>{items.heading}</p>
                  </div>
                  <p style={items.boldHeading?{visibility:"visible"}:{visibility:"hidden"}} className="r3-dark">{items.boldHeading}</p>                   
                   <p style={items.lightHeading?{visibility:"visible"}:{visibility:"hidden"}} className="r3-info-below-dark">{items.lightHeading}</p>
                   <p style={items.paragraph?{visibility:"visible"}:{visibility:"hidden"}} className="r3-info-below-dark">{items.paragraph}</p>
                   <button className="after-delete" onClick={()=>{
                      deleteItem2(index);
                      }}>Delete</button>
              </div>
        )
  }
    return(
        <div ref={pdfRef}>
            <div class="r3-body" contentEditable="true">
        <div class="r3-nameandphoto" >
               <div class="r3-photo" contentEditable="false">
                  <div class="mainphoto">
                      <img src={path?path:"../images/monkey.png"} alt="" />
                  </div>
                  
               </div>
               <div class="r3-name">
                <p class="r3-realname">RICHARD </p>
                <p class="r3-realname second">SANCHEZ </p>
                <p class="r3-des">Product Designer</p>
               </div>
        </div>
        <div class="r3-content">
            <div class="r3-left">
                    <div class="r3-aboutme">
                    <input className="resume3img after-delete" type="file" accept="image/*" onChange={chagephoto}/>
                        <p class="r3-am">About Me</p>
                        <p class="r3-des-about-me">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Vestibulum sit amet quam
                            rhoncus, egestas dui eget,
                            malesuada justo. Ut aliquam
                            augue
                        </p>
                    </div>
                    <div class="r3-contact">
                        <p>+123-456-7890</p>
                        <p>hello@gmail.com</p>
                        <p>123 Anywhere St., Any City</p>
                    </div>
                    <div class="r3-language">
                        <div class="r3-box">
                            <p>LANGUAGE</p>
                        </div>
                        <ul>
                            <li>English</li>
                            <li>Germany(basic)</li>
                            <li>Spain (basic)</li>
                        </ul>
                    </div>
                    <div class="r3-EXPERTISE">
                        <div class="r3-box">
                            <p>EXPERTISE</p>
                        </div>
                        <ul>
                            <li>Management Skills
                            </li>
                            <li>Digital Marketing</li>
                            <li>Negotiation</li>
                            <li>Critical Thinking</li>
                            <li>Leadership</li>
                        </ul>
                    </div>
                    {list2.map(Addlist2)}
                    <button onMouseOver={showForm3} className="after-delete button" onMouseOut={showForm22} style={ {cursor:"pointer"}}> <span>Add Section</span> </button>
                <form  onMouseOver={showForm3} onMouseOut={showForm22} className="r3-form section-form" action="" style={showform2?{visibility:"visible"}:{visibility:"hidden"}}>
                    <input name="heading2" onChange={addSecton2} type="text" value={set2.heading} placeholder="Add Heading" autocomplete="off"/>
                    <br />
                    <input name="boldHeading2" onChange={addSecton2} type="text" value={set2.boldHeading} placeholder="Add Bold Sub Heading" autocomplete="off"/>
                    <br />
                    <input name="lightHeading2" onChange={addSecton2} type="text" value={set2.lightHeading} placeholder="Add Light Sub Heading" autocomplete="off"/>
                    <br />
                    <textarea  onChange={addSecton2} name="paragraph2" id="" cols="30" value={set2.paragraph} rows="10" placeholder="Add Paragraph" autocomplete="off"></textarea>
                    <br />
                    <button className="add"  style={{cursor:"pointer"}} onClick={AddSection2}> <span>Add</span> </button>
                </form>
            </div>
            <div class="r3-right">
                <div class="r3-EXPERIENCE">
                    <div class="r3-box">
                        <p>EXPERIENCE</p>
                    </div>
                    <p class="r3-dark">Studio Showde</p>
                    <p class="r3-dark">Canberra - Australia</p>
                    <p class="r3-dark">2020 - 2022</p>
                    <p class="r3-info-below-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum sit amet quam rhoncus, egestas dui eget,
                        malesuada justo. Ut aliquam augue.</p>
                    <div>
                        <p class="r3-dark">Elsetown Cor.</p>
                    <p class="r3-dark">Kota Baru - Singapore
                    </p>
                    <p class="r3-dark">2016 - 2020
                    </p>
                    <p class="r3-info-below-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum sit amet quam rhoncus, egestas dui eget,
                        malesuada justo. Ut aliquam augue.</p>
                    </div>
                    <div>
                        <p class="r3-dark">Studio Showde</p>
                    <p class="r3-dark">sydney - Australia
                    </p>
                    <p class="r3-dark">2010 - 2015
                    </p>
                    <p class="r3-info-below-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum sit amet quam rhoncus, egestas dui eget,
                        malesuada justo. Ut aliquam augue.</p>
                    </div>
                </div>
                <div class="r3-EDUCATION">
                    <div class="r3-box">
                        <p>EDUCATION</p>
                    </div>
                    <p class="r3-dark">Borcelle University</p>                   
                     <p class="r3-info-below-dark">Bachelor of Business Management</p>
                     <p class="r3-info-below-dark">2014-2023</p>
                    <div>
                        <p class="r3-dark">Borcelle University</p>
                    <p class="r3-info-below-dark">Master of Business Management</p>
                    <p class="r3-info-below-dark">2014-2018</p>
                    </div>

                </div>
                <div class="r3-SKILLS-SUMMARY">
                    <div class="r3-box box2">
                        <p>SKILLS SUMMARY</p>
                    </div>
                    <div class="r3-persent">
                        <table>
                            

                            <tr>
                              <td><span>Centro comercial</span></td>
                              <td><span>Centro comercial</span></td>
                              
                            </tr>
                          </table>
                    </div>
                    

                </div>
                {list.map(Addlist)}
                <button className="after-delete button" onMouseOver={showForm} onMouseOut={showForm2} style={ {cursor:"pointer"}}> <span>ADD Section</span> </button>
                <form  onMouseOver={showForm} onMouseOut={showForm2} className="r3-form section-form" action="" style={showform?{visibility:"visible"}:{visibility:"hidden"}}>
                    <input name="heading" onChange={addSecton} type="text" value={set.heading} placeholder="Add Heading" autocomplete="off"/>
                    <br />
                    <input name="boldHeading" onChange={addSecton} type="text" value={set.boldHeading} placeholder="Add Bold Sub Heading" autocomplete="off"/>
                    <br />
                    <input name="lightHeading" onChange={addSecton} type="text" value={set.lightHeading} placeholder="Add Light Sub Heading" autocomplete="off"/>
                    <br />
                    <textarea  onChange={addSecton} name="paragraph" id="" cols="30" value={set.paragraph} rows="10" placeholder="Add Paragraph"></textarea>
                    <br />
                    <button className="add"  style={{cursor:"pointer"}} onClick={AddSection}> <span>Add</span> </button>
                </form>
            </div>
        </div>
    </div>
             <button className="download button after-delete" style={showform?{visibility:"hidden"}:{visibility:"visible"}} onClick={download}><span>download</span></button>
        </div>
    )
}
export default ResumeThree;