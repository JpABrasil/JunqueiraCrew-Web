'use client';
import React, { useState } from 'react';
import { FileText, Download, Upload } from 'lucide-react';
import { Inputzone } from './components/Inputzone';
import { ClipLoader } from "react-spinners";

export default function ReportViewer() {
  const [reportTriggered, setReportTriggered] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [carregando, setCarregando] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_API_URL ;
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      console.log('Enviando arquivos:', selectedFiles.map(f => f.name));
      // Aqui você adicionaria a lógica de upload
      alert(`${selectedFiles.length} arquivo(s) enviado(s) com sucesso!`);
      setSelectedFiles([]);
      const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      };
    }
  };

  const handleDownload = () => {
    // Simula download do relatório
    alert('Download do relatório iniciado!');
  };

  const toggleReport = () => {
    setReportTriggered(!reportTriggered);
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-white">
      {/* Barra Superior */}
      <header className="bg-blue-900 text-white p-4 h-fit shadow-md">
        <h1 className="text-2xl font-semibold text-center">
          Analista FIDCs
        </h1>
      </header>

      <div className="w-screen h-8/10  flex-1 scroll-hidden mx-auto p-6 pl-20 pr-20  gap-10 space-y-8 flex flex-row">
        <Inputzone setCarregando={setCarregando} apiURL={apiURL}/>

        <div className="bg-gray-50 flex-3/4 border-2 border-gray-200 rounded-lg h-192 flex flex-col items-center justify-center">
          {/*Report */}
          
          <div className="text-center text-gray-500 flex-3/4 w-10/10 items-center justify-center flex">
          {carregando ? (
              <>
                <div className='flex flex-col items-center justify-center mb-4'>
                  <ClipLoader color="#0000FF" size={50} className="mx-auto mb-4" loading={true} />
                  <p className='text-gray-400'>Processando Requisição</p>
                </div>
              </>    
            ) : 
            (
              !reportTriggered ? (
                <div>
                  <FileText size={48} className="mx-auto mb-4 text-gray-400 " />
                  <p className="text-lg">Aguardando Relatório</p>
                </div>
              ) : (
                <iframe
                  src="https://drive.google.com/file/d/1Np9cgIVyj6BEJEiJZQwZPzRj8NMll4M1/preview"
                  className="w-full h-full"
                  allow="autoplay"
                />
              )
            )
          }
          </div>
         

          {/* Botão de Download */}
          <div className="text-center p-6">
            <button
              onClick={handleDownload}
              disabled={!reportTriggered}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors  ${
                reportTriggered
                  ? 'bg-blue-900 text-white hover:bg-blue-800 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download size={20} className="mr-2" />
              Baixar Relatório
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}