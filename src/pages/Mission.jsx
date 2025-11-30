import styled from "styled-components";
import Header from "@/shared/components/Header/Header";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import PointSummary from "@/features/local/components/mission/PointSummary";
import MissionSummary from "@/features/local/components/mission/MissionSummary";

const Container = styled.div`
    padding: 40px 20px;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export default function MissionPage() {
    const totalPoints = 1204;
    const missionCount = 2;
    const availablePoints = 1204;

    // TODO: 백엔드 API 연동 후 실제 데이터로 교체
    const availableMissions = [
        {
            id: 1,
            title: "파이키에서 라떼 마시기",
            deadline: "2025.12.26까지",
            point: 10,
            isNew: true
        },
        {
            id: 2,
            title: "동네 카페 탐방하기",
            deadline: "2025.12.30까지",
            point: 15,
            isNew: false
        }
    ];

    const completedMissions = [
        {
            id: 101,
            title: "동네 맛집 리뷰 작성하기",
            deadline: "2025.11.25까지",
            point: 20,
            isNew: false
        }
    ];

    const handleUsePoints = () => {
        // 포인트 사용 로직 구현
        console.log("포인트 사용");
    };

    return (
        <>
            <Header text="Localy 미션" />
            <Container>
                <PointSummary
                    totalPoints={totalPoints}
                    missionCount={missionCount}
                    availablePoints={availablePoints}
                    onUsePoints={handleUsePoints}
                />
                <MissionSummary
                    availableMissions={availableMissions}
                    completedMissions={completedMissions}
                />
            </Container>
            <BottomNavigation />
        </>
    );
}