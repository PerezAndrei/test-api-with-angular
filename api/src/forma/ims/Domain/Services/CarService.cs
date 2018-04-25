using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ims.Domain.IServices;
using ims.Models;
using ims.DataAccess.Entities;
using AutoMapper;
using ims.DataAccess.Repository;

namespace ims.Domain.Services
{
    public class CarService : ICarService
    {
        private readonly IMapper _mapper;
        private readonly IRepository _repository;
        public CarService(IMapper mapper, IRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        //public IEnumerable<CarVM> GetCitiesByRegion(int regionId)
        //{
        //    var cities = _repository.Get<City>(filter: c => c.RegionId == regionId);
        //    return _mapper.Map<IEnumerable<CarVM>>(cities);
        //}

        public CarVM GetCarById(int id)
        {
            var car = _repository.GetById<Car>(id);
            return _mapper.Map<CarVM>(car);
        }
        public IEnumerable<CarVM> GetCars()
        {
            var cars = _repository.GetAll<Car>();
            return _mapper.Map<IEnumerable<CarVM>>(cars);
        }
        public void CreateCar(CarVM carVM)
        {
            var car = _mapper.Map<Car>(carVM);
            _repository.Create<Car>(car);
            _repository.Save();
        }
        public void UpdateCar(CarVM carVM)
        {
            var car = _repository.GetById<Car>(carVM.Id);
            car.Model = carVM.Model;
            car.Type = carVM.Type;
            car.Year = carVM.Year;
            _repository.Update<Car>(car);
            _repository.Save();
        }
        public void DeleteCar(int id)
        {
            _repository.Delete<Car>(id);
            _repository.Save();
        }
    }
}