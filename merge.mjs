import PDFMerger from 'pdf-merger-js';

const merger = new PDFMerger();
import express from 'express';
import path from 'path';

const app = express();

const mergepdfs = async (p1, p2) => {
  try {
    await merger.add(p1);
    await merger.add(p2); 
    let d= new Date().getTime()
    await merger.save(`public/${d}.pdf`); 
    return d;
  } catch (error) {
    console.error('Error occurred during PDF merging:', error);
  }
};

export default mergepdfs;

