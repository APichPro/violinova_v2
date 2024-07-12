import AbcjsRenderer from "@/components/AbcjsRenderer";
import React, { useState } from "react";

const CourseDetails = ({ params }: { params: { courseId: string } }) => {
  const [abcNotation, setAbcNotation] = useState(
    `X:1759
T:F\"ur Elise
T:Bagatelle No.25 in A, WoO.59
C:Ludwig van Beethoven
O:Germany
Z:Transcribed by Frank Nordberg - http://www.musicaviva.com
F:http://abc.musicaviva.com/tunes/beethoven-ludwig-van/be059/be059-pno2.abc
V:1 Program 1 0 %Piano
V:2 Program 1 0 bass %Piano
M:3/8
L:1/16
Q:3/8=40
K:Am
V:1
e^d|e^deB=dc|A2 z CEA|B2 z E^GB|c2 z Ee^d|
V:1
e^deB=dc|A2 z CEA|B2 z EcB|[1A2 z2:|[2A2z Bcd|
V:1
|:e3 Gfe|d3 Fed|c3 Edc|B2 z Ee z|z ee' z z ^d|
V:1
e z z ^ded|e^deB=dc|A2 z CEA|B2 zE^GB|c2 z Ee^d|
V:1
e^deB=dc|A2 z CEA|B2 z EcB|[1A2 z Bcd:|
V:1
[2A2 z [Ec][Fc][EGc]|c4 f>e|e2d2 _b>a|agfedc|
V:1
_B2A2 A/G/A/B/|c4 d^d|e3 efA|c4 d>B|
V:1
c/g/G/g/ A/g/B/g/ c/g/d/g/|e/g/c'/b/ a/g/f/e/ d/g/f/d/|c/g/G/g/ A/g/B/g/ c/g/d/g/|
V:1
e/g/c'/b/ a/g/f/e/ d/g/f/d/|e/f/e/^d/ e/B/e/d/ e/B/e/d/|e3 Be^d|e3 Be z|
V:1
z ^de z z d|e^deB=dc|A2 z CEA|B2 z E^GB|c2 z Ee^d|
V:1
e^deB=dc|A2 z CEA|B2 z EcB|A2 z Bcd|e3 Gfe|
V:1
d3 Fed|c3 Edc|B2 z Ee z|z ee' zz ^d|e z z ^ded|
V:1
e^deB=dc|A2 z CEA|B2 z E^GB|c2 z Ee^d|e^deB=dc|A2 z CEA|
V:1
B2 z EcB|A2 z2 z2|[E6G6_B6^c6]|[F4A4d4][^ce][df]|[^G4d4f4][G2d2f2]|[A6c6e6]|
V:1
[F4d4][Ec][DB]|[C4^F4A4][C2A2][C2A2][E2c2][D2B2]|[C6A6]|[E6G6_B6^c6]|[F4A4d4][^ce][df]|
V:1
[d4f4][d2f2]|[d6f6]|[G4_e4][Fd][_Ec]|[D4F4_B4][D2F2A2]|[D4F4^G4][D2F2G2]|[C2E2A2] z2 z2|
V:1
[E2B2] z2 z2|(3A,CE (3Ace (3dcB|(3Ace (3ac'e' (3d'c'b|(3Ace (3ac'e' (3d'c'b|
V:1
(3_ba_a (3g_gf (3e_ed|(3_d'c'b (3_ba_b (3g_gf|e^deB=dc|A2 z CEA|
V:1
B2 z E^GB|c2 z Ee^d|e^deB=dc|A2 z CEA|B2 z EcB|
V:1
A2 z Bcd|e3 Gfe|d3 Fed|c3 Edc|B2 z Ee z|
V:1
z ee' z z ^d|e z z ^ded|e^deB=dc|A2 z CEA|B2 z E^GB|
V:1
c2 z Ee^d|e^deB=dc|A2 z CEA|B2 z DcB|[C4A4]|]
W:
W:
W:  From Musica Viva - http://www.musicaviva.com
W:  the Internet center for free sheet music downloads.`
  );

  return (
    <div>
      <p className="text-white-1">Course Details for {params.courseId}</p>
      <AbcjsRenderer abc={abcNotation} />
    </div>
  );
};

export default CourseDetails;
