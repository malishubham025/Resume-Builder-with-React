import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function Download(props){
    let data=props.current;
    // pdfRef.current
    const download1=()=>{
     
            var addsection=document.querySelectorAll(".after-delete");
            addsection.forEach((a)=>{
                   a.classList.add("temp-remove");
            })
            

        const input = data;
        const inputHeight = input.scrollHeight; // Capture the full height of the resume
        const inputWidth = input.scrollWidth; // Capture the full width of the resume
        html2canvas(input, {
            height: inputHeight,
            width: inputWidth,
          }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', [inputWidth, inputHeight], true);
      
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            
            const imgHeight = (canvas.height / canvas.width) * imgWidth;
            const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
            const imgX = (pdfWidth-imgWidth*ratio)/4;
            const imgY = 0;
      
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
            pdf.save('Resume.pdf');
          });
        addsection.forEach((a)=>{
            a.classList.remove("temp-remove");
     })
    }
    return (
        <button onClick={download1}>Download</button>
    )
}
export default Download;