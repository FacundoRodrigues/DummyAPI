using Exam.Domain;

namespace Exam.Services;

public interface ITrainService
{
    public Train Hook(int value, Direction direction);

    public Train Unhook(Direction direction);

    public Train Get();
}