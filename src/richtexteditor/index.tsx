import React from 'react'
import RichTextEditor from './RTEContainer'

const RTEIndex = () => {
  return (
    <div className='w-full'>
      <div className='w-[55%] mx-auto shadow-2xl rounded-md border-2 border-[rgba(0,0,0,0.1)] relative -top-3.5'>
        <div className='font-mono font-bold px-0 pt-3 pb-2 border-b-[1.7px] border-b-[rgba(0,0,0,0.15)] w-[95%] mx-auto'>Rich Text Editor</div>
        <RichTextEditor />
        <div><button>Cancel</button></div>
      </div>
    </div>
  )
}

export default RTEIndex