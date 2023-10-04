using Exam.Domain;

namespace Exam.Services
{
    public class TrainService : ITrainService
    {
        private readonly Train _train;

        public TrainService()
        {
            _train = new Train
            {
                Carriage = new List<int>()
            };
        }

        public async Task<Train> Hook(int value, Direction direction)
        {
            if (direction == Direction.Left) //Izq = principio | Der = fin
            {
                _train.Carriage.Insert(0, value);
            }
            else
            {
                _train.Carriage.Add(value);
            }

            return _train;
        }

        public async Task<Train> Unhook(Direction direction)
        {
            var firstIndex = 0;
            var lastIndex = _train.Carriage.Count - 1;

            if (_train.Carriage.Count == 0) throw new IndexOutOfRangeException();

            _train.Carriage.RemoveAt(direction == Direction.Left ? firstIndex : lastIndex);

            return _train;
        }

        public async Task<Train> Get()
        {
            return _train;
        }
    }
}