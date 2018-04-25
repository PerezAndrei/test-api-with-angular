using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ims.Models
{
    public class CarVM
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
    }
}