using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickDemo.Controllers
{
    public class AccountController : Controller
    {
        #region login page
        /// <summary>
        /// created by XXXXXX
        /// created date 15 july 2022
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        #endregion

        #region register user page
        /// <summary>
        /// created by XXXXXX
        /// created date 15 july 2022
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        #endregion
    }
}
