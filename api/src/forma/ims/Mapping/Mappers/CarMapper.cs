using AutoMapper;

namespace ims.Mapping.Mappers
{
    public class CarMapper : Profile
    {
        public CarMapper()
        {
            CreateMap<DataAccess.Entities.Car, Models.CarVM>()
                .PreserveReferences();
            CreateMap<Models.CarVM, DataAccess.Entities.Car>()
                .PreserveReferences();
        }
    }
}