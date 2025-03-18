import QueryBuilder from '../../builder/QueryBuilder';
import { quranLSUserSearchableFields } from './quran-LS.constant';
import { TQuranLSUser } from './quran-LS.interface';
import { QuranLSUser } from './quran-LS.model';

// post
const createQuranLSUserIntoDb = async (userInfo: TQuranLSUser) => {
  const result = await QuranLSUser.create(userInfo);
  return result;
};

// get
const getQuranLSUsersFromDb = async (query: Record<string, unknown>) => {
  const quranLSUserQuery = new QueryBuilder(QuranLSUser.find(), query)
    .search(quranLSUserSearchableFields)
    .filter();

  const data = await quranLSUserQuery.modelQuery;

  const document = await QuranLSUser.find();
  const totalCount = document?.length;
  return { data, totalCount };
};

// update
const updateQuranLSUsersIntoDb = async (
  studentId: string,
  body: Partial<TQuranLSUser>,
) => {
  const result = await QuranLSUser.findOneAndUpdate({ _id: studentId }, body, {
    new: true,
  });

  return result;
};

// delete
const deleteQuranLSUserIntoDb = async (studentId: string) => {
  const result = await QuranLSUser.findByIdAndDelete({ _id: studentId });
  return result;
};

// const makePdfQuranLSUsersFromDb = async (res) => {
//   try {
//     // ✅ Fetch data before setting headers
//     const data = await QuranLSUser.find();

//     if (!data.length) {
//       return res
//         .status(404)
//         .json({ message: 'No users found in the database.' });
//     }

//     // ✅ Set response headers
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

//     const doc = new PDFDocument();
//     doc.pipe(res);

//     // ✅ Use Noto Sans Bengali from node_modules
//     const banglaFontPath = path.join(
//       process.cwd(),
//       'node_modules/@fontsource/noto-sans-bengali/files/noto-sans-bengali-latin-400-normal.woff',
//     );

//     doc.font(banglaFontPath);

//     // Title in Bangla
//     doc
//       .fontSize(16)
//       .text('কুরআন লার্নিং সেশন শিক্ষার্থীরা', { align: 'center' });
//     doc.moveDown();

//     // List users (Bangla names will now display correctly)
//     data.forEach((item, index) => {
//       doc.text(`${index + 1}. ${item.userName}`);
//     });

//     doc.end();
//   } catch (error) {
//     console.error('Error generating PDF:', error);

//     if (!res.headersSent) {
//       res.status(500).json({ message: 'Error generating PDF', error });
//     }
//   }
// };

export const QuranLSUserServices = {
  createQuranLSUserIntoDb,
  getQuranLSUsersFromDb,
  updateQuranLSUsersIntoDb,
  deleteQuranLSUserIntoDb,
};
