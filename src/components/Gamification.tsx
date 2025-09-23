import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Zap, 
  Award, 
  Target, 
  Crown,
  Medal,
  CheckCircle,
  Gift
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  completed: boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  maxProgress: number;
  reward: number;
  type: 'daily' | 'weekly' | 'monthly';
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Eco Warrior',
    description: 'Complete 10 waste collections',
    icon: <Trophy className="h-6 w-6" />,
    progress: 8,
    maxProgress: 10,
    completed: false,
    points: 100,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Recycling Master',
    description: 'Achieve 90% recycling rate',
    icon: <Star className="h-6 w-6" />,
    progress: 85,
    maxProgress: 90,
    completed: false,
    points: 250,
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Green Champion',
    description: 'Earn 1000 eco points',
    icon: <Crown className="h-6 w-6" />,
    progress: 750,
    maxProgress: 1000,
    completed: false,
    points: 500,
    rarity: 'epic'
  },
  {
    id: '4',
    title: 'Perfect Sorter',
    description: 'Sort waste correctly 50 times',
    icon: <Medal className="h-6 w-6" />,
    progress: 50,
    maxProgress: 50,
    completed: true,
    points: 150,
    rarity: 'common'
  }
];

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Recycler',
    description: 'Recycle at least 3 items today',
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    progress: 2,
    maxProgress: 3,
    reward: 25,
    type: 'daily'
  },
  {
    id: '2',
    title: 'Weekly Warrior',
    description: 'Complete 5 collections this week',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    progress: 3,
    maxProgress: 5,
    reward: 100,
    type: 'weekly'
  },
  {
    id: '3',
    title: 'Zero Waste Week',
    description: 'No general waste for a week',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    progress: 2,
    maxProgress: 7,
    reward: 200,
    type: 'weekly'
  }
];

const leaderboard = [
  { rank: 1, name: 'EcoMaster2024', points: 3250, badge: 'Legendary' },
  { rank: 2, name: 'GreenGuru', points: 2890, badge: 'Epic' },
  { rank: 3, name: 'RecycleKing', points: 2650, badge: 'Epic' },
  { rank: 4, name: 'You', points: 2450, badge: 'Rare', isCurrentUser: true },
  { rank: 5, name: 'WasteWarrior', points: 2230, badge: 'Rare' },
];

export function Gamification() {
  const [userLevel, setUserLevel] = useState(12);
  const [userPoints, setUserPoints] = useState(2450);
  const [nextLevelPoints] = useState(2600);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-secondary';
      case 'rare': return 'bg-info';
      case 'epic': return 'bg-warning';
      case 'legendary': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-success';
      case 'weekly': return 'bg-info';
      case 'monthly': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const formatTimeLeft = (deadline: Date) => {
    const now = new Date();
    const timeLeft = deadline.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    
    if (hoursLeft < 24) {
      return `${hoursLeft}h left`;
    }
    return `${Math.floor(hoursLeft / 24)}d left`;
  };

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {userLevel}</h2>
                <p className="text-muted-foreground">Eco Champion</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{userPoints}</div>
              <p className="text-sm text-muted-foreground">Eco Points</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userLevel + 1}</span>
              <span>{userPoints} / {nextLevelPoints}</span>
            </div>
            <Progress value={(userPoints / nextLevelPoints) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.completed ? 'bg-success/5 border-success' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        {achievement.completed && (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                        <div className="flex items-center gap-1 text-sm text-warning">
                          <Star className="h-3 w-3" />
                          {achievement.points} points
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge className={getChallengeTypeColor(challenge.type)}>
                          {challenge.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {challenge.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.progress} / {challenge.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-1 text-warning mb-2">
                        <Gift className="h-4 w-4" />
                        <span className="font-semibold">{challenge.reward}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeLeft(challenge.deadline)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      user.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                    }`}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${user.isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                        </span>
                        <Badge variant="outline" className={getRarityColor(user.badge.toLowerCase())}>
                          {user.badge}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{user.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                    {user.rank <= 3 && (
                      <Trophy className={`h-5 w-5 ${
                        user.rank === 1 ? 'text-warning' : 
                        user.rank === 2 ? 'text-muted-foreground' : 
                        'text-warning/60'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}