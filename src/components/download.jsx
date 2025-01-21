import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Download(props) {
    const downloadPDF = () => {
        const data = props.current.current; // Access the ref

        console.log(data); // Verify the DOM element

        if (data) {
            const buttonsAndInputs = data.querySelectorAll("button, input");
            buttonsAndInputs.forEach((button) => {
                button.classList.add("temp-remove");
            });

            const inputHeight = data.scrollHeight;
            const inputWidth = data.scrollWidth;

            html2canvas(data, {
                height: inputHeight,
                width: inputWidth,
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", [inputWidth, inputHeight]);

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height / canvas.width) * imgWidth;

                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 4;
                const imgY = 0;

                pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);
                pdf.save("Resume.pdf");
            });

            buttonsAndInputs.forEach((button) => {
                button.classList.remove("temp-remove");
            });
        } else {
            console.error("Reference to the element is undefined.");
        }
    };

    return <button onClick={downloadPDF}>Download</button>;
}

export default Download;
