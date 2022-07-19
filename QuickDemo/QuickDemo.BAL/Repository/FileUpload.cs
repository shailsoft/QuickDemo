using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using QuickDemo.Models;
using QuickDemo.QuickDemo.DAL.DataEntities;
using QuickDemo.QuickDemo.Model.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuickDemo.QuickDemo.BAL.Repository
{
    public class FileUpload: IFileUpload
    {
        private readonly QuickDemoDbContext _context;
        private readonly IWebHostEnvironment webHostEnvironment;
        public FileUpload(QuickDemoDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this.webHostEnvironment = webHostEnvironment;
        }

        public async Task<FileManagerModel> DisplayImages()
        {
            try
            {
                FileManagerModel model = new FileManagerModel();
                var userImagesPath = Path.Combine(webHostEnvironment.WebRootPath, "Images");
                DirectoryInfo dir = new DirectoryInfo(userImagesPath);
                FileInfo[] files = dir.GetFiles();
                model.Files = files;
                return model;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> UploadData(List<ImgDTO> imgDTO)
        {
            try
            {
                bool status = false;
                if (imgDTO.Count > 0)
                {
                    foreach (var file in imgDTO)
                    {
                        string Base64DataUrl = file.Base64Data;
                        string CovertedBase64DataUrl = Base64DataUrl.Substring(Base64DataUrl.LastIndexOf(',') + 1);// removing extra header information 
                        string imagename = file.Name;
                        Base64ToImage(CovertedBase64DataUrl, imagename);
                        status = true;
                    }
                }
                return status;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void Base64ToImage(string base64String, string imagename)
        {
            try
            {
                // Convert base 64 string to byte[] 
                byte[] imageBytes = Convert.FromBase64String(base64String);
                MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
                ms.Write(imageBytes, 0, imageBytes.Length);
                System.Drawing.Image image = Image.FromStream(ms, true);
                var spath = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images")).Root + $@"\";

                string path = spath + imagename;
                image.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
