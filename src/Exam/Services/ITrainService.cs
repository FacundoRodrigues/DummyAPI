using Exam.Domain;

namespace Exam.Services;

public interface ITrainService
{
    public Task<Train> Hook(int value, Direction direction);

    public Task<Train> Unhook(Direction direction);

    public Task<Train> Get();
}