import React, { useRef, useState } from 'react'

function CreateRecipe() {

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className='flex flex-col items-center justify-center gap-10 py-20'>
      <h1 className='text-white text-4xl font-bold font-manrope'>Create a New Recipe</h1>
      <form className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='text-white '>Recipe Title</label>
          <input type='text' placeholder='Enter the title of your recipe' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='text-white '>Ingredients</label>
          <textarea name="ingredients" id="" rows="4" cols="50" placeholder=' Eggs,sugar.....' className='w-[500px] h-[100px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='text-white '>Instructions</label>
          <textarea name="ingredients" id="" rows="4" cols="50" placeholder='Step 1: Mix the ingredients.....' className='w-[500px] h-[100px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='text-white '>Preparation Time (minutes)</label>
          <input type='text' placeholder='e.g.,  15min' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title' className='text-white '>Cooking Time (minutes)</label>
          <input type='text' placeholder='e.g., 30min' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
        </div>
        <div className="border-2 border-dashed border-gray-500 rounded-xl w-full max-w-3xl h-64 flex flex-col items-center justify-center gap-3">
        <h2 className="text-lg text-white font-semibold">Upload a Photo</h2>
        <p className="text-gray-300">Drag and drop or click to upload</p>

        <button
          onClick={handleUploadClick}
          className="bg-[#2B3328] px-6 py-2 rounded-full text-white font-medium"
          type="button"
        >
          Upload
        </button>
        {/* Show file name if selected */}
        {selectedFile && (
          <p className="text-green-400">{selectedFile.name}</p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="w-full max-w-3xl flex justify-end mt-6">
        <button className="bg-[#96DB74] hover:bg-[#8cd066] text-black font-semibold px-6 py-2 rounded-full">
          Submit Recipe
        </button>
      </div>
      </form>
    </div>
  )
}

export default CreateRecipe