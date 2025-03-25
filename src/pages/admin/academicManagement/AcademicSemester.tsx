import { useGetAllAcademicSemesterQuery } from "../../../redux/feature/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading, isError } = useGetAllAcademicSemesterQuery();
  console.log(data);

  return <div> Academic Semester Page</div>;
};

export default AcademicSemester;
