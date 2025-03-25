import { useGetAllAcademicSemesterQuery } from "../../../redux/feature/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading, isError } = useGetAllAcademicSemesterQuery();
  console.log(data);

  return (
    <div>
      <h1> This is Academic Semester component </h1>
    </div>
  );
};

export default AcademicSemester;
