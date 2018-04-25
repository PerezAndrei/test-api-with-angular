using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ims.Domain.IServices;
using ims.Models;


namespace ims.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/cars")]
    public class CityController : ApiController
    {
        private readonly ICarService _carService;

        public CityController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetCars()
        {
            var cars = _carService.GetCars();
            return Ok(cars);
            
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult CreateCar(CarVM carVM)
        {
            _carService.CreateCar(carVM);
            return Ok();
        }

        [HttpPut]
        [Route("")]
        public IHttpActionResult UpdateCar(CarVM carVM)
        {
            _carService.UpdateCar(carVM);
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult DeleteCar (int id)
        {
            _carService.DeleteCar(id);
            return Ok("delete succefull");
        }
    }
}
