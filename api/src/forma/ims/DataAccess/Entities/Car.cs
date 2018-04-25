using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ims.DataAccess.Repository;

namespace ims.DataAccess.Entities
{
    public class Car : Entity<int>
    {
        public string Model { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
    }
}