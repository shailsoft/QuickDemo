using Microsoft.AspNetCore.Mvc;
using QuickDemo.Models;
using QuickDemo.QuickDemo.BAL;
using QuickDemo.QuickDemo.Model.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuickDemo.Controllers
{
    public class FileUploadController : Controller
    {
        #region constuctor
        private readonly IFileUpload _fileUpload;
        public FileUploadController(IFileUpload fileUpload)
        {
            _fileUpload = fileUpload;
        }
        #endregion

        #region Upload file 
        /// <summary>
        /// Created date XXXXXX
        /// created by XXXXXX
        /// summary update images in folder
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult UploadFile()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(List<ImgDTO> imgDTO)
        {
            try
            {
                bool status = await _fileUpload.UploadData(imgDTO);
                if (status)
                    return Json("file uploaded successfully!");
                else
                    return Json("something went wrong!");
            }
            catch (Exception ex)
            {
                throw null;
            }
        }
        #endregion

        #region display images from folder
        [HttpGet]
        public async Task<IActionResult> DisplayImages()
        {
            try
            {
                FileManagerModel model = await _fileUpload.DisplayImages();
                return View(model);
            }
            catch (Exception )
            {
                //logger
                throw null;
            }
        }
        #endregion
    }
}