using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ims.Models;

namespace ims.Domain.IServices
{
    public interface ICarService
    {
        CarVM GetCarById(int id);
        IEnumerable<CarVM> GetCars();
        void CreateCar(CarVM car);
        void UpdateCar(CarVM car);
        void DeleteCar(int id);
    }
}