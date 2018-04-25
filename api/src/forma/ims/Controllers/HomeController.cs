using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ims.Domain.IServices;
using ims.Helpers;
using ims.Models;

namespace ims.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index1()
        {
            return View();
        }
    }
}
