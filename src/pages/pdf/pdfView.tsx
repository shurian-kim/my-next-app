import { logger } from '@/utils/logger';
import type { AppProps } from 'next/app';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect } from 'react';
import Image from 'next/image'

export const PdfExport = async (id: string): Promise<void> => {

    if (typeof document !== 'undefined') {
        const convas = document.querySelector<HTMLElement>(`#${id}`);

        if (convas !== null) {

            convas.style.display = "";

            setTimeout(() => {

                void html2canvas(convas).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = 210;
                    const pageHeight = imgWidth * 1.414;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;
                    heightLeft -= pageHeight;

                    // eslint-disable-next-line new-cap
                    const doc = new jsPDF('p', 'mm', 'A4');
                    let position = 0;
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

                    while (heightLeft >= 20) {
                        position = heightLeft - imgHeight;
                        doc.addPage();
                        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    doc.save('Reports.pdf');
                });
                convas.style.display = "none";
            }, 100)
        }

    }
};

const handlePdf = async (): Promise<void> => {
    void PdfExport('capture');
};


export default function PdfView({ Component, pageProps, router }: AppProps): JSX.Element {

    return (
        <>
            {/* <Image src="C:\Users\DJ-KIM\Pictures\물망총.jpeg" alt="Picture of me" width={500} height={500} /> */}
            <div id="capture" style={{ display: "none" }}>
                <picture>
                    <img src={process.env.PUBLIC_URL ?? "" + `/images/나무늘봉순.png`} alt="" />
                    <img src={process.env.PUBLIC_URL ?? "" + `/images/물망총.jpeg`} alt="" />
                    <img src={process.env.PUBLIC_URL ?? "" + `/images/로도도.png`} alt="" />
                </picture>
            </div>
            <button onClick={() => { void handlePdf(); }}>PDF변환</button>
        </>
    )
}