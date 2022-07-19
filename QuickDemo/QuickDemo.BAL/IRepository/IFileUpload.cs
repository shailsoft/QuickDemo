using Microsoft.AspNetCore.Http;
using QuickDemo.Models;
using QuickDemo.QuickDemo.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickDemo.QuickDemo.BAL
{
    public interface IFileUpload
    {
        Task<bool> UploadData(List<ImgDTO> imgDTO);
        Task<FileManagerModel> DisplayImages();
    }
}
